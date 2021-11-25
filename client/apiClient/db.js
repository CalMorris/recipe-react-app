import request from 'superagent'

const dbRecipe = '/api/v1/db/recipes'
// const addUserRecipe = '/api/v1/db/addrecipe'

export function fetchRecipes (token) {
  return request.get(`${dbRecipe}/getrecipes`)
    .set('authorization', `Bearer ${token}`)
    .then(res => res.body.recipe)
    .catch(err => console.log(err.message))
}

export function addRecipe (recipeId, title, imageUrl, token) {
  return request.post(`${dbRecipe}/addrecipe`)
    .set('authorization', `Bearer ${token}`)
    .send({ recipeId, title, imageUrl })
    .then(res => res)
    .catch(err => console.log(err.message))
}

export function deleteRecipe (recipeId, token) {
  return request.del(`${dbRecipe}/deleterecipe`)
    .set('authorization', `Bearer ${token}`)
    .send({ recipeId })
    .then(res => {
      return res
    })
    .catch(err => console.log(err.message))
}
