import {
  QUESTION_COUNT,
  getCorrectPositions,
  type AnswerPosition,
} from './lexidata'

export type PlayerAnswer = AnswerPosition | null

export interface PlayerState {
  readonly group: number | null
  readonly series: number | null
  readonly answers: readonly PlayerAnswer[]
  readonly succeeded: boolean
}

function emptyAnswers(): readonly PlayerAnswer[] {
  return Array.from({ length: QUESTION_COUNT }, () => null)
}

export function createInitialState(): PlayerState {
  return {
    group: null,
    series: null,
    answers: emptyAnswers(),
    succeeded: false,
  }
}

export function selectGroup(state: PlayerState, group: number | null): PlayerState {
  if (state.group === group) return state

  return { group, series: state.series, answers: emptyAnswers(), succeeded: false }
}

export function selectSeries(state: PlayerState, series: number | null): PlayerState {
  if (state.series === series) return state

  return { group: state.group, series, answers: emptyAnswers(), succeeded: false }
}

export function chooseAnswer(
  state: PlayerState,
  questionIndex: number,
  answer: AnswerPosition,
): PlayerState {
  if (state.succeeded || state.group === null || state.series === null) return state
  if (!Number.isInteger(questionIndex) || questionIndex < 0 || questionIndex >= QUESTION_COUNT) {
    return state
  }

  const answers = [...state.answers]
  answers[questionIndex] = answer
  const correctPositions = getCorrectPositions(state.group, state.series)
  const succeeded = correctPositions !== null
    && answers.every((selected, index) => selected === correctPositions[index])

  return { ...state, answers, succeeded }
}

export function resetAnswers(state: PlayerState): PlayerState {
  return { ...state, answers: emptyAnswers(), succeeded: false }
}

export function isReady(state: PlayerState): boolean {
  return state.group !== null && state.series !== null
}