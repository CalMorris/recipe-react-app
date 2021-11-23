import request from 'superagent'

const recipesUrl = 'http://localhost:3000/api/v1/recipes'
const recipeUrl = 'http://localhost:3000/api/v1/recipe'
const recipeAdd = 'http://localhost:3000/api/v1/recipeadd'
const userRecipes = 'http://localhost:3000/api/v1/userrecipes'

function formatKeywords (keywords) {
  const splitBySpace = keywords.split(' ')
  const stringByComma = splitBySpace.join(',')
  return stringByComma
}

export function getRecipes (query) {
  const keywords = formatKeywords(query)
  return request.get(recipesUrl)
    .set('keywords', keywords)
    .then(res => res.body)
    .catch(error => console.log(error))
}

export function getRecipe (recipeId) {
  return request.get(recipeUrl)
    .set('id', recipeId)
    .then(res => res.body)
    .catch(error => console.log(error))
}

export async function addUser (user) {
  return request.post('http://localhost:3000/api/v1/users')
    .send(user)
    .catch(err => console.log(err.message))
}

export function addRecipe (recipeId, title, imageUrl, token) {
  return request.post(recipeAdd)
    .set('authorization', `Bearer ${token}`)
    .send({ recipeId, title, imageUrl })
    .then(res => {
      return null
    })
    .catch(logError)
}

export function fetchRecipes (token) {
  return request.get(userRecipes)
    .set('authorization', `Bearer ${token}`)
    // .send(auth0Id)
    .then(res => res.body.recipe)
    .catch(err => console.log(err.message))
}
