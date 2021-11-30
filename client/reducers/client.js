import { SET_RECIPES_CLIENT, ADD_RECIPE_CLIENT, REMOVE_RECIPE_CLIENT } from '../actions/client'

const initialRecipes = [{
  image: '',
  recipeId: '',
  title: ''
}]

export function recipesClient (state = initialRecipes, action) {
  switch (action.type) {
    case SET_RECIPES_CLIENT:
      return action.recipes
    case ADD_RECIPE_CLIENT:
      return [...state, action.recipe]
    case REMOVE_RECIPE_CLIENT:
      console.log(state)
      return state.filter(recipe => recipe.recipeId !== action.recipeId)
    default:
      return state
  }
}
