import { expect, test } from '@playwright/test'

const GROUP_ONE_SERIES_ONE = [1, 1, 3, 2, 1, 2, 3, 1, 3, 2, 1, 3]

async function selectActivity(page: import('@playwright/test').Page): Promise<void> {
  await page.locator('#group-select').selectOption('1')
  await page.locator('#series-select').selectOption('1')
}

test('requires an activity and resets answers when it changes', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('[data-answer]').first()).toBeDisabled()
  await selectActivity(page)
  await page.locator('[data-question="0"][data-answer="1"]').click()
  await expect(page.locator('[data-question="0"][data-answer="1"]')).toHaveAttribute('aria-pressed', 'true')

  await page.locator('#series-select').selectOption('2')
  await expect(page.locator('[data-question="0"][data-answer="1"]')).toHaveAttribute('aria-pressed', 'false')
})

test('keeps a complete wrong attempt private', async ({ page }) => {
  await page.goto('/')
  await selectActivity(page)

  for (let question = 0; question < 12; question += 1) {
    await page.locator(`[data-question="${question}"][data-answer="2"]`).click()
  }

  await expect(page.locator('.celebration')).not.toHaveClass(/is-visible/)
  await expect(page.locator('.status-pin')).not.toHaveClass(/is-raised/)
  await expect(page.locator('[data-answer]').first()).toBeEnabled()
})

test('raises the pin only for the exact solution and reset clears it', async ({ page }) => {
  await page.goto('/')
  await page.locator('#sound-toggle').click()
  await page.evaluate(() => {
    Object.defineProperty(window, '__vibrationCalls', { configurable: true, value: [] })
    Object.defineProperty(navigator, 'vibrate', {
      configurable: true,
      value: (pattern: number | number[]) => {
        const calls = (window as unknown as { __vibrationCalls: number[][] }).__vibrationCalls
        calls.push(Array.isArray(pattern) ? pattern : [pattern])
        return true
      },
    })
  })
  await selectActivity(page)

  for (const [question, answer] of GROUP_ONE_SERIES_ONE.entries()) {
    await page.locator(`[data-question="${question}"][data-answer="${answer}"]`).click()
  }

  await expect(page.locator('.status-pin')).toHaveClass(/is-raised/)
  await expect(page.locator('.celebration')).toHaveClass(/is-visible/)
  await expect(page.locator('.device')).toHaveClass(/is-complete/)
  await expect(page.locator('[data-answer]').first()).toBeDisabled()
  await expect.poll(() => page.evaluate(() =>
    (window as unknown as { __vibrationCalls: number[][] }).__vibrationCalls,
  )).toEqual([[45, 35, 75, 35, 120]])

  await page.locator('#reset-button').click()
  await expect(page.locator('.status-pin')).not.toHaveClass(/is-raised/)
  await expect(page.locator('#group-select')).toHaveValue('1')
  await expect(page.locator('#series-select')).toHaveValue('1')
})

test('remembers language but not activity state', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.setItem('lexidata-player.language', 'en'))
  await page.reload()
  await selectActivity(page)
  await page.reload()

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('#group-select')).toHaveValue('')
  await expect(page.locator('#series-select')).toHaveValue('')
  await expect(page.locator('#reset-button')).toHaveText('Reset')
})

test('offers local installation when the browser supports it', async ({ page }) => {
  await page.goto('/')

  await page.evaluate(() => {
    const event = new Event('beforeinstallprompt', { cancelable: true })
    Object.defineProperties(event, {
      prompt: { value: () => Promise.resolve() },
      userChoice: { value: Promise.resolve({ outcome: 'accepted' }) },
    })
    window.dispatchEvent(event)
  })

  await expect(page.locator('#install-button')).toHaveText('Installer')
  await page.locator('#install-button').click()
  await expect(page.locator('#install-button')).toHaveCount(0)
})

test('reloads from the service-worker cache while offline', async ({ page, context }) => {
  await page.goto('/')
  await page.evaluate(() => navigator.serviceWorker.ready)
  await page.reload()
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null)
  await context.setOffline(true)
  await page.reload()

  await expect(page.locator('.device')).toBeVisible()
  await expect(page.locator('[data-answer]')).toHaveCount(36)
})