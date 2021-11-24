import request from 'superagent'

const userRecipes = '/api/v1/db/getrecipes'
const addUserRecipe = '/api/v1/db/addrecipe'

export function fetchRecipes (token) {
  return request.get(userRecipes)
    .set('authorization', `Bearer ${token}`)
    .then(res => res.body.recipe)
    .catch(err => console.log(err.message))
}

export function addRecipe (recipeId, title, imageUrl, token) {
  return request.post(addUserRecipe)
    .set('authorization', `Bearer ${token}`)
    .send({ recipeId, title, imageUrl })
    .then(res => {
      return null
    })
    .catch(err => console.log(err.message))
}
