export const GROUP_COUNT = 60
export const SERIES_COUNT = 60
export const QUESTION_COUNT = 12

export type AnswerPosition = 1 | 2 | 3

const CODE: readonly AnswerPosition[] = [
  3, 1, 2, 3, 2, 3, 1, 2, 1, 2, 1, 2, 3, 1, 3, 2, 2, 3, 2, 3,
  1, 1, 2, 1, 2, 3, 1, 3, 1, 2, 3, 2, 3, 1, 2, 1, 2, 3, 2, 3,
  1, 1, 2, 3, 2, 3, 1, 2, 1, 1, 2, 3, 2, 3, 1, 3, 1, 2, 3, 2,
]

const SERIES_ORDER: readonly number[] = [
  1, 5, 7, 2, 9, 6, 10, 3, 8, 4, 16, 13, 17, 11, 19, 14, 20, 18, 12, 15,
  21, 25, 27, 29, 24, 22, 30, 26, 28, 23, 32, 35, 38, 40, 31, 37, 34, 39,
  36, 33, 41, 44, 46, 49, 47, 43, 48, 50, 45, 42, 54, 52, 58, 56, 53, 59,
  51, 55, 57, 60,
]

const QUESTION_OFFSETS: readonly number[] = [
  8, 13, 17, 22, 26, 29, 32, 35, 39, 44, 48, 53,
]

export function getCorrectPositions(
  group: number,
  series: number,
): readonly AnswerPosition[] | null {
  if (!Number.isInteger(group) || !Number.isInteger(series)) return null
  if (group < 1 || group > GROUP_COUNT) return null
  if (series < 1 || series > SERIES_COUNT) return null

  const rotation = group - SERIES_ORDER[series - 1]

  return QUESTION_OFFSETS.map((offset) => {
    const index = ((offset + rotation) % CODE.length + CODE.length) % CODE.length
    return CODE[index]
  })
}