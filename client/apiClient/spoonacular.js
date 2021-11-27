import request from 'superagent'

const spoonacular = '/api/v1/spoonacular'

export function getRecipes (query) {
  return request.get(`${spoonacular}/recipes`)
    .query({ keywords: query })
    .then(res => res.body)
    .catch(error => console.log(error))
}

export function getRecipe (recipeId) {
  return request.get(`${spoonacular}/id`)
    .query({ id: recipeId })
    .then(res => res.body)
    .catch(error => console.log(error))
}
