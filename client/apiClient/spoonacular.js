import request from 'superagent'

const spoonacular = '/api/v1/spoonacular'

function formatKeywords (keywords) {
  const splitBySpace = keywords.split(' ')
  const stringByComma = splitBySpace.join(',')
  return stringByComma
}

export function getRecipes (query) {
  const keywords = formatKeywords(query)
  return request.get(`${spoonacular}/recipes`)
    .set('keywords', keywords)
    .then(res => res.body)
    .catch(error => console.log(error))
}

export function getRecipe (recipeId) {
  return request.get(`${spoonacular}/id`)
    .set('id', recipeId)
    .then(res => res.body)
    .catch(error => console.log(error))
}
