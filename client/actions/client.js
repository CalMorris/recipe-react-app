export const ADD_RECIPE_CLIENT = 'ADD_RECIPE_CLIENT'
export const REMOVE_RECIPE_CLIENT = 'REMOVE_RECIPE_CLIENT'
export const SET_RECIPES_CLIENT = 'SET_RECIPES_CLIENT'

export function addRecipeClient (recipe) {
  return {
    type: ADD_RECIPE_CLIENT,
    recipe
  }
}

export function removeRecipeClient (recipeId) {
  return {
    type: REMOVE_RECIPE_CLIENT,
    recipeId
  }
}

export function setRecipeClient (recipes) {
  return {
    type: SET_RECIPES_CLIENT,
    recipes
  }
}
