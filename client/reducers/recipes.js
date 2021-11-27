import { SET_RECIPES } from '../actions/recipes'

const initialRecipes = [{
  image: '',
  id: '',
  title: ''
}]

// this needs to be reviewed
// need to create a combine reducers

export function recipes (state = initialRecipes, action) {
  console.log(action.recipes)
  switch (action.type) {
    case SET_RECIPES:
      return action.recipes
    default:
      return state
  }
}
