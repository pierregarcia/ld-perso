import { describe, expect, it } from 'vitest'
import { getCorrectPositions, type AnswerPosition } from './lexidata'
import {
  chooseAnswer,
  createInitialState,
  isReady,
  resetAnswers,
  selectGroup,
  selectSeries,
} from './state'

describe('player state', () => {
  it('starts blank and requires both selectors', () => {
    const initial = createInitialState()

    expect(initial.group).toBeNull()
    expect(initial.series).toBeNull()
    expect(initial.answers).toEqual(Array(12).fill(null))
    expect(isReady(initial)).toBe(false)
    expect(isReady(selectSeries(selectGroup(initial, 1), 1))).toBe(true)
  })

  it('resets all answers when either selector changes', () => {
    let state = selectSeries(selectGroup(createInitialState(), 1), 1)
    state = chooseAnswer(state, 0, 1)

    expect(selectGroup(state, 2).answers).toEqual(Array(12).fill(null))
    expect(selectSeries(state, 2).answers).toEqual(Array(12).fill(null))
  })

  it('does not succeed or disclose anything for a completed wrong attempt', () => {
    let state = selectSeries(selectGroup(createInitialState(), 1), 1)

    for (let index = 0; index < 12; index += 1) {
      state = chooseAnswer(state, index, 2)
    }

    expect(state.answers).not.toContain(null)
    expect(state.succeeded).toBe(false)
  })

  it('latches success until reset', () => {
    let state = selectSeries(selectGroup(createInitialState(), 1), 1)
    const solution = getCorrectPositions(1, 1) as readonly AnswerPosition[]

    solution.forEach((answer, index) => {
      state = chooseAnswer(state, index, answer)
    })

    expect(state.succeeded).toBe(true)
    expect(chooseAnswer(state, 0, 3)).toBe(state)
    expect(resetAnswers(state)).toEqual({
      group: 1,
      series: 1,
      answers: Array(12).fill(null),
      succeeded: false,
    })
  })
})