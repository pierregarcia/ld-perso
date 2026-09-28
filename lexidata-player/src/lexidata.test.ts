import { describe, expect, it } from 'vitest'
import {
  GROUP_COUNT,
  QUESTION_COUNT,
  SERIES_COUNT,
  getCorrectPositions,
} from './lexidata'

describe('getCorrectPositions', () => {
  it.each([
    [0, 1],
    [61, 1],
    [1, 0],
    [1, 61],
    [1.5, 1],
    [1, Number.NaN],
  ])('rejects an invalid group/series pair (%s, %s)', (group, series) => {
    expect(getCorrectPositions(group, series)).toBeNull()
  })

  it('preserves known vectors from the existing engine', () => {
    expect(getCorrectPositions(1, 1)).toEqual([1, 1, 3, 2, 1, 2, 3, 1, 3, 2, 1, 3])
    expect(getCorrectPositions(2, 1)).toEqual([2, 3, 2, 1, 3, 3, 1, 2, 1, 3, 1, 1])
  })

  it('returns twelve valid positions for every group and series', () => {
    for (let group = 1; group <= GROUP_COUNT; group += 1) {
      for (let series = 1; series <= SERIES_COUNT; series += 1) {
        const positions = getCorrectPositions(group, series)

        expect(positions).toHaveLength(QUESTION_COUNT)
        expect(positions?.every((position) => [1, 2, 3].includes(position))).toBe(true)
        expect(getCorrectPositions(group, series)).toEqual(positions)
      }
    }
  })
})