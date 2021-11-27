import request from 'superagent'

const dbRecipeURL = '/api/v1/db/recipes'

export function fetchRecipes (token) {
  return request.get(dbRecipeURL)
    .set('authorization', `Bearer ${token}`)
    .then(res => res.body.recipe)
    .catch(err => console.log(err.message))
}

export function addRecipe (recipeId, title, imageUrl, token) {
  return request.post(dbRecipeURL)
    .set('authorization', `Bearer ${token}`)
    .send({ recipeId, title, imageUrl })
    .then(res => res)
    .catch(err => console.log(err.message))
}

export function deleteRecipe (recipeId, token) {
  return request.del(dbRecipeURL)
    .set('authorization', `Bearer ${token}`)
    .send({ recipeId })
    .then(res => {
      return res
    })
    .catch(err => console.log(err.message))
}
