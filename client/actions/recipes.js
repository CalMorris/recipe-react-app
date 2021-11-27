import { fetchRecipes } from '../apiClient/recipes'

export const SET_RECIPES = 'SET_RECIPES'

export function setRecipes (recipes) {
  return {
    type: SET_RECIPES,
    recipes
  }
}

export function setRecipesState (token) {
  return (dispatch) => {
    return fetchRecipes(token)
      .then(recipeList => {
        console.log(recipeList)
        return dispatch(setRecipes(recipeList))
        // return null
      })
      .catch(error => console.log(error.message))
  }
}
