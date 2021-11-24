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

  //   return getCoreConcepts(week)
  //     .then(concepts => {
  //       const conceptsArray = JSON.parse(concepts[0].coreConcepts)
  //       dispatch(setConcepts(conceptsArray))
  //       return null
  //     })
  //     .catch(err => console.log(err.message))
  // }
  }
}
