import { formatMethod, roundIngredientMetric, convertMinsToDisplayTime } from './Recipe'

describe('FORMAT METHOD  to split sentences by fullstop and return an array of strings', () => {
  test('returns an array', () => {
    const sentence = 'Mix flour, salt, paprika and pepper. Dip chicken in buttermilk and then into flour mixture. Cook chicken in oil, starting on medium-high heat, then, when chicken is browned, reduce heat to medium and cook an additional 30 to 35 minutes until chicken is done (approx 150-155 degrees F internal), turning occasionally.'
    const expected = ['Mix flour, salt, paprika and pepper', ' Dip chicken in buttermilk and then into flour mixture', ' Cook chicken in oil, starting on medium-high heat…150-155 degrees F internal), turning occasionally']
    const actual = formatMethod(sentence)
    expect(actual[0]).toEqual(expected[0])
    expect(actual).toHaveLength(3)
  })
})

describe('ROUND INGREDIENT', () => {
  const numbers = [['1.1', '1'], ['1005.3', '1005'], ['15.7', '15'], ['22.0', '22'], ['19.99', '19']]
  test.each(numbers)('returns a string of a number rounded down', (num, expected) => {
    const actual = roundIngredientMetric(num)
    expect(actual).toBe(expected)
  })
})

describe('CONVERT TIME TO HR MINUTES', () => {
  const cookingTime = [['80', '1 hr 20 mins'], ['140', '2 hrs 20 mins'], ['20', '20 mins']]
  test.each(cookingTime)('returns a string time converted to hours minutes where appropriate', (minutes, expected) => {
    const actual = convertMinsToDisplayTime(minutes)
    expect(actual).toBe(expected)
  })
})
