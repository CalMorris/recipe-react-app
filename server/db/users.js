const connection = require('./connection')

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserByName (username, db = connection) {
  return db('users')
    .select()
    .where('username', username)
    .first()
}

function createUser (user, db = connection) {
  return db('users')
    .insert(user)
}

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
  userExists,
  getUserByName,
  createUser,
  addRecipe,
  getRecipe,
  deleteRecipe
}