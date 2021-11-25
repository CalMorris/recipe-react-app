import { fetchRecipes } from '../apiClient/db'

export const SET_RECIPES = 'SET_RECIPES'

export function setRecipes (recipes) {
  return {
    type: SET_RECIPES,
    recipes
  }
}

export function setRecipesState (token) {
  return dispatch => {
    return fetchRecipes(token)
      .then(recipeList => {
        dispatch(setRecipes(recipeList))
        return null
      })
      .catch(error => console.log(error.message))
  }
}
