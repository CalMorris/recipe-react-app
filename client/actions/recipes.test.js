import {
  setRecipes, SET_RECIPES, addRecipes, ADD_RECIPE,
  removeRecipe, REMOVE_RECIPE, removeRecipeState, addRecipeState, setRecipesState
} from './recipes'

import { fetchRecipes, addRecipe, deleteRecipe } from '../apiClient/recipes'
jest.mock('../apiClient/recipes')

describe('setRecipes', () => {
  const recipe = {
    title: 'Lasagne',
    recipeId: '1234',
    image: 'imageUrl'
  }

  const expected = {
    type: SET_RECIPES,
    recipes: {
      title: 'Lasagne',
      recipeId: '1234',
      image: 'imageUrl'
    }
  }
  test('return object with a recipe object', () => {
    expect(setRecipes(recipe)).toEqual(expected)
  })
  test('return property with a SET_RECIPES type', () => {
    expect(setRecipes(recipe).type).toEqual('SET_RECIPES')
  })
  test('return object with property recipes', () => {
    expect(setRecipes(recipe).recipes).toEqual(recipe)
  })
})

describe('addRecipes', () => {
  const recipe = {
    title: 'Lasagne',
    recipeId: '1234',
    image: 'imageUrl'
  }

  const expected = {
    type: ADD_RECIPE,
    recipe: {
      title: 'Lasagne',
      recipeId: '1234',
      image: 'imageUrl'
    }
  }

  test('return object with a recipe object', () => {
    expect(addRecipes(recipe)).toEqual(expected)
  })
  test('return property with a SET_RECIPES type', () => {
    expect(addRecipes(recipe).type).toEqual('ADD_RECIPE')
  })
  test('return object with property recipes', () => {
    expect(addRecipes(recipe).recipe).toEqual(recipe)
  })
})

describe('removeRecipe', () => {
  const recipeId = '1234'

  const expected = {
    type: REMOVE_RECIPE,
    recipeId: '1234'
  }

  test('return object with a recipe object', () => {
    expect(removeRecipe(recipeId)).toEqual(expected)
  })
  test('return property with a SET_RECIPES type', () => {
    expect(removeRecipe(recipeId).type).toEqual('REMOVE_RECIPE')
  })
  test('return object with property recipes', () => {
    expect(removeRecipe(recipeId).recipeId).toBe(recipeId)
  })
})

describe('fetchRecipeState', () => {
  addRecipe.mockReturnValue(Promise.resolve())

  expect.assertions(1)
  const dispatch = jest.fn()
  it('call the dispatch function', () => {
    return addRecipeState('1234', 'Chicken Pizza', 'pizzaUrl')(dispatch) // higher order function // assert the function called
      // eslint-disable-next-line promise/always-return
      .then(() => {
        expect(dispatch.mock.calls[0][0].type).toBe(ADD_RECIPE)
        expect(dispatch.mock.calls[0][0].recipe.recipeId).toBe('1234')
        expect(dispatch.mock.calls[0][0].recipe.title).toBe('Chicken Pizza')
        expect(dispatch.mock.calls[0][0].recipe.imageUrl).toBe('pizzaUrl')
      }
      )
  })
})

describe('setRecipesState', () => {
  expect.assertions(1)

  const expected = { title: 'Lasagne', recipeId: '123', imageUrl: 'lasagneImg' }
  fetchRecipes.mockReturnValue(Promise.resolve(expected))
  const dispatch = jest.fn()

  it('call the dispatch function', () => {
    return setRecipesState('token')(dispatch)
      // eslint-disable-next-line promise/always-return
      .then(() => {
        expect(dispatch.mock.calls[0][0].type).toBe('SET_RECIPES')
        expect(dispatch.mock.calls[0][0].recipes).toBe(expected)
      }
      )
  })
})

describe('RemoveRecipeState', () => {
  expect.assertions(1)
  const dispatch = jest.fn()
  const expected = '54321'
  it('call dispatch id for redux state', () => {
    deleteRecipe.mockReturnValue(Promise.resolve())
    return removeRecipeState(expected, 'fakeToken')(dispatch)
    // eslint-disable-next-line promise/always-return
      .then(() => {
        expect(dispatch.mock.calls[0][0].type).toEqual(REMOVE_RECIPE)
        expect(dispatch.mock.calls[0][0].recipeId).toEqual(expected)
      })
  })
})
