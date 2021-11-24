const connection = require('./connection')

// check to see if the recipe already exists first.
async function addRecipe (recipe, db = connection) {
  return db('recipes')
    .insert(recipe)
}

async function getRecipe (userId, db = connection) {
  return db('recipes')
    .select('recipe_id as id', 'recipe_title as title', 'recipe_image_url as image')
    .where('auth0_id', userId)
}

// function is to be added to the server side routing
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
