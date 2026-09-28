import './style.css'
import { registerSW } from 'virtual:pwa-register'
import { translate, type Language, type TranslationKey } from './i18n'
import { type AnswerPosition } from './lexidata'
import {
  chooseAnswer, createInitialState, isReady, resetAnswers, selectGroup, selectSeries,
  type PlayerState,
} from './state'

const LANGUAGE_KEY = 'lexidata-player.language'
const app = document.querySelector<HTMLDivElement>('#app')!
let language: Language = localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'fr'
let state: PlayerState = createInitialState()
let soundEnabled = true
let successAnnounced = false
let updateAvailable = false
let installPrompt: BeforeInstallPromptEvent | null = null
let applyUpdate: (reloadPage?: boolean) => Promise<void>

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const t = (key: TranslationKey): string => translate(language, key)

function selectorOptions(selected: number | null): string {
  const options = Array.from({ length: 60 }, (_, index) => index + 1)
    .map((value) => `<option value="${value}" ${selected === value ? 'selected' : ''}>${value}</option>`)
    .join('')
  return `<option value="">${t('select')}</option>${options}`
}

function answerControl(questionIndex: number): string {
  const selected = state.answers[questionIndex]
  const disabled = !isReady(state) || state.succeeded
  const choices = ([1, 2, 3] as const).map((answer) => `
    <button class="answer-choice ${selected === answer ? 'is-selected' : ''}" type="button"
      data-question="${questionIndex}" data-answer="${answer}" aria-pressed="${selected === answer}"
      aria-label="${t('question')} ${questionIndex + 1}, ${t('answer')} ${answer}"
      ${disabled ? 'disabled' : ''}>${answer}</button>`).join('')

  return `<div class="answer-row" role="group" aria-label="${t('question')} ${questionIndex + 1}">
    <span class="question-number" aria-hidden="true">${questionIndex + 1}</span>
    <div class="answer-segments">${choices}</div>
  </div>`
}

function celebration(): string {
  const pieces = Array.from({ length: 24 }, (_, index) =>
    `<i style="--i:${index}" aria-hidden="true"></i>`).join('')
  return `<div class="celebration ${state.succeeded ? 'is-visible' : ''}" role="status" aria-live="assertive">
    <div class="confetti">${pieces}</div>
    <div class="success-message"><strong>${state.succeeded ? t('success') : ''}</strong>
      <span>${state.succeeded ? t('successDetail') : ''}</span></div>
  </div>`
}

function render(): void {
  document.documentElement.lang = language
  document.title = `Lexidata Player - ${t('answers')}`
  const ready = isReady(state)

  app.innerHTML = `<main class="page-shell">
    <header class="topbar">
      <div class="brand-block"><span class="brand-mark"><b>LEXI</b>DATA</span><p>${t('subtitle')}</p></div>
      <div class="utility-controls">
        ${installPrompt ? `<button class="install-button" id="install-button" type="button">${t('install')}</button>` : ''}
        <button class="icon-button" id="sound-toggle" type="button" aria-pressed="${soundEnabled}"
          title="${soundEnabled ? t('soundOn') : t('soundOff')}"><span aria-hidden="true">${soundEnabled ? '&#9835;' : '&#215;'}</span>
          <span class="sr-only">${soundEnabled ? t('soundOn') : t('soundOff')}</span></button>
      </div>
    </header>
    <section class="device ${state.succeeded ? 'is-complete' : ''}" aria-labelledby="device-title">
      <h1 id="device-title" class="sr-only">${t('title')}</h1>
      <div class="activity-controls">
        <label><span>${t('group')}</span><select id="group-select">${selectorOptions(state.group)}</select></label>
        <div class="status-pin ${state.succeeded ? 'is-raised' : ''}" aria-hidden="true"><span></span></div>
        <label><span>${t('series')}</span><select id="series-select">${selectorOptions(state.series)}</select></label>
      </div>
      <p class="start-prompt ${ready ? 'is-hidden' : ''}">${t('chooseActivity')}</p>
      <section class="answer-board ${ready ? 'is-ready' : ''}" aria-label="${t('answers')}" aria-disabled="${!ready}">
        ${Array.from({ length: 12 }, (_, index) => answerControl(index)).join('')}
      </section>
      <div class="device-footer">
        <button id="reset-button" class="reset-button" type="button" ${ready ? '' : 'disabled'}>${t('reset')}</button>
      </div>
    </section>
  </main>
  <div class="update-notice ${updateAvailable ? 'is-visible' : ''}" role="status">
    <span>${t('updateReady')}</span><button id="update-button" type="button">${t('update')}</button>
  </div>${celebration()}`
}

async function installApp(): Promise<void> {
  if (!installPrompt) return
  const prompt = installPrompt
  installPrompt = null
  await prompt.prompt()
  await prompt.userChoice
  render()
}

function playSuccessSound(): void {
  if (!soundEnabled || typeof AudioContext === 'undefined') return

  try {
    const audioContext = new AudioContext()
    const notes = [
      { frequency: 523.25, delay: 0, duration: 0.38 },
      { frequency: 659.25, delay: 0.11, duration: 0.4 },
      { frequency: 783.99, delay: 0.22, duration: 0.46 },
      { frequency: 1046.5, delay: 0.35, duration: 0.72 },
    ]

    audioContext.resume().catch(() => undefined)
    notes.forEach(({ frequency, delay, duration }, index) => {
      const start = audioContext.currentTime + delay
      const fundamental = audioContext.createOscillator()
      const overtone = audioContext.createOscillator()
      const fundamentalGain = audioContext.createGain()
      const overtoneGain = audioContext.createGain()

      fundamental.type = 'triangle'
      fundamental.frequency.value = frequency
      fundamentalGain.gain.setValueAtTime(0.0001, start)
      fundamentalGain.gain.linearRampToValueAtTime(index === 3 ? 0.12 : 0.09, start + 0.025)
      fundamentalGain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
      fundamental.connect(fundamentalGain).connect(audioContext.destination)
      fundamental.start(start)
      fundamental.stop(start + duration + 0.02)

      overtone.type = 'sine'
      overtone.frequency.value = frequency * 2
      overtoneGain.gain.setValueAtTime(0.0001, start)
      overtoneGain.gain.linearRampToValueAtTime(0.018, start + 0.02)
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, start + duration * 0.72)
      overtone.connect(overtoneGain).connect(audioContext.destination)
      overtone.start(start)
      overtone.stop(start + duration * 0.72 + 0.02)

      if (index === notes.length - 1) {
        fundamental.addEventListener('ended', () => { void audioContext.close() }, { once: true })
      }
    })
  } catch {
    // Audio is an optional enhancement; success feedback should still work without it.
  }
}

function celebrateWithVibration(): void {
  if (typeof navigator.vibrate !== 'function') return
  try {
    navigator.vibrate([45, 35, 75, 35, 120])
  } catch {
    // Vibration may be unavailable or blocked by the browser/device.
  }
}

function update(nextState: PlayerState): void {
  const justSucceeded = !state.succeeded && nextState.succeeded
  state = nextState
  render()
  if (justSucceeded && !successAnnounced) {
    successAnnounced = true
    playSuccessSound()
    celebrateWithVibration()
  }
  if (!state.succeeded) successAnnounced = false
}

app.addEventListener('change', (event) => {
  const target = event.target
  if (!(target instanceof HTMLSelectElement)) return
  const value = target.value === '' ? null : Number(target.value)
  update(target.id === 'group-select' ? selectGroup(state, value) : selectSeries(state, value))
})

app.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const answerButton = target.closest<HTMLButtonElement>('[data-answer]')
  if (answerButton) {
    update(chooseAnswer(state, Number(answerButton.dataset.question), Number(answerButton.dataset.answer) as AnswerPosition))
  } else if (target.closest('#reset-button')) {
    update(resetAnswers(state))
  } else if (target.closest('#language-toggle')) {
    language = language === 'fr' ? 'en' : 'fr'
    localStorage.setItem(LANGUAGE_KEY, language)
    render()
  } else if (target.closest('#sound-toggle')) {
    soundEnabled = !soundEnabled
    render()
  } else if (target.closest('#install-button')) {
    void installApp()
  } else if (target.closest('#update-button')) {
    void applyUpdate(true)
  }
})

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  installPrompt = event as BeforeInstallPromptEvent
  render()
})

window.addEventListener('appinstalled', () => {
  installPrompt = null
  render()
})

applyUpdate = registerSW({
  onNeedRefresh() {
    updateAvailable = true
    render()
  },
})

render()
