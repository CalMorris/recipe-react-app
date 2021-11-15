import request from 'superagent'

const recipesUrl = 'http://localhost:3000/api/v1/recipes'
const recipeUrl = 'http://localhost:3000/api/v1/recipe'

export function getRecipes (query) {
  return request.get(recipesUrl)
    .set('keywords', query)
    .then(res => res.body)
    .catch(error => console.log(error))
}

export function getRecipe (recipeId) {
  return request.get(recipeUrl)
    .set('id', recipeId)
    .then(res => res.body)
    .catch(error => console.log(error))
}
