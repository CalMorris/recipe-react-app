const connection = require('./connection')

async function addRecipe (recipe, db = connection) {
  return db('recipes')
    .insert(recipe)
}

async function getRecipe (auth0id, db = connection) {
  return db('recipes')
    .select('recipe_id as recipeId', 'recipe_title as title', 'recipe_image_url as image')
    .where('auth0_id', auth0id)
}

async function deleteRecipe (userId, recipeId, db = connection) {
  return db('recipes')
    .where({ auth0_id: userId, recipe_id: recipeId })
    .del()
}

module.exports = {
  addRecipe,
  getRecipe,
  deleteRecipe
}
