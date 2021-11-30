import { fetchRecipes, addRecipe, deleteRecipe } from '../apiClient/recipes'
import { setRecipeClient } from './client'
export const SET_RECIPES = 'SET_RECIPES'
export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'

export function setRecipes (recipes) {
  return {
    type: SET_RECIPES,
    recipes
  }
}

export function addRecipes (recipe) {
  return {
    type: ADD_RECIPE,
    recipe
  }
}

export function removeRecipe (recipeId) {
  return {
    type: REMOVE_RECIPE,
    recipeId
  }
}

export function removeRecipeState (recipeId, token) {
  return (dispatch) => {
    return deleteRecipe(recipeId, token)
      .then(recipe => {
        return dispatch(removeRecipe(recipeId))
      })
      .catch(error => console.log(error.message))
  }
}

export function setRecipesState (token) {
  return (dispatch) => {
    return fetchRecipes(token)
      .then(recipeList => {
        dispatch(setRecipes(recipeList))
        dispatch(setRecipeClient(recipeList))
        return null
      })
      .catch(error => console.log(error.message))
  }
}

export function addRecipeState (recipeId, title, imageUrl, token) {
  return (dispatch) => {
    return addRecipe(recipeId, title, imageUrl, token)
      .then(() => dispatch(addRecipes({ recipeId, title, imageUrl })))
      .catch(error => console.log(error.message))
  }
}
