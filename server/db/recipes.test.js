const { getRecipe, deleteRecipe, addRecipe } = require('./recipes')
const testDb = require('./connectionTestDB')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeAll(() => {
  return testDb.seed.run()
})

describe('getRecipe', () => {
  test('fetch user recipes', () => {
    expect.assertions(3)
    const user = 'auth|123'
    return getRecipe(user, testDb)
      .then(recipe => {
        expect(recipe[0].recipeId).toBe('716429')
        expect(recipe[0].title).toBe('Crispy Buttermilk Fried Chicken')
        expect(recipe[0].image).toBe('https://spoonacular.com/recipeImages/640803-556x370.jpg')
      })
  })
})

describe('deleteRecipe', () => {
  test('delete a user recipe', () => {
    expect.assertions(1)
    const user = 'auth|123'
    const recipeId = '716429'
    return deleteRecipe(user, recipeId, testDb)
      .then(id => {
        expect(id).toEqual(1)
      })
  })
})

describe('addRecipe', () => {
  test('add a recipe for a user', () => {
    expect.assertions(1)
    const recipe = {
      auth0_id: 'auth|1234',
      recipe_id: '888888',
      recipe_title: 'lasagne',
      recipe_image_url: 'thisIsATestUrl.jpeg'
    }
    return addRecipe(recipe, testDb)
      .then(id => {
        expect(id[0]).toEqual(2)
      })
  })
})
