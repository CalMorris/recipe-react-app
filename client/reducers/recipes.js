import { SET_RECIPES, ADD_RECIPE, REMOVE_RECIPE } from '../actions/recipes'

const initialRecipes = [{
  image: '',
  id: '',
  title: ''
}]

export function recipes (state = initialRecipes, action) {
  switch (action.type) {
    case SET_RECIPES:
      return action.recipes
    case ADD_RECIPE:
      return [...state, action.recipe]
    case REMOVE_RECIPE:
      const remove = state.filter(recipe => recipe.id !== action.recipeId)
      return remove
    default:
      return state
  }
}
