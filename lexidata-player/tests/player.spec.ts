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
  await selectActivity(page)

  for (const [question, answer] of GROUP_ONE_SERIES_ONE.entries()) {
    await page.locator(`[data-question="${question}"][data-answer="${answer}"]`).click()
  }

  await expect(page.locator('.status-pin')).toHaveClass(/is-raised/)
  await expect(page.locator('.celebration')).toHaveClass(/is-visible/)
  await expect(page.locator('[data-answer]').first()).toBeDisabled()

  await page.locator('#reset-button').click()
  await expect(page.locator('.status-pin')).not.toHaveClass(/is-raised/)
  await expect(page.locator('#group-select')).toHaveValue('1')
  await expect(page.locator('#series-select')).toHaveValue('1')
})

test('remembers language but not activity state', async ({ page }) => {
  await page.goto('/')
  await page.locator('#language-toggle').click()
  await selectActivity(page)
  await page.reload()

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('#group-select')).toHaveValue('')
  await expect(page.locator('#series-select')).toHaveValue('')
  await expect(page.locator('#reset-button')).toHaveText('Reset')
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