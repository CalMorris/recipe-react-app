const request = require('superagent')
const path = require('path')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./db/users')
const checkJwt = require('./auth0')

const server = express()
const recipesUrl = '/api/v1/recipes'
const recipeUrl = '/api/v1/recipe'
const users = '/api/v1/users'
const recipeAdd = '/api/v1/recipeadd'
const userRecipes = '/api/v1/userrecipes'

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(cors('*'))

server.get(recipesUrl, (req, res) => {
  const keywords = req.headers.keywords
  request.get('https://api.spoonacular.com/recipes/findByIngredients')
    .query({
      ContentType: 'application/json',
      apiKey: '1d49f111f2564f1ca8b4f3582bf55d79',
      ingredients: keywords, // the ingredients are seperated by comma - no spaces or whitespace
      number: '20'
    })
    .then(result => res.json(result.body))
    .catch(err => console.log(err.message))
})

server.get(recipeUrl, (req, res) => {
  const id = req.headers.id
  request.get(`https://api.spoonacular.com/recipes/${id}/information`)
    .query({
      ContentType: 'application/json',
      apiKey: '1d49f111f2564f1ca8b4f3582bf55d79'
    })
    .then(result => res.json(result.body))
    .catch(err => console.log(err))
})

server.post(users, async (req, res) => {
  const newUser = req.body
  const { auth0Id, email } = newUser
  const user = {
    auth0_id: auth0Id,
    email
  }
  try {
    await db.createUser(user)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

server.post(recipeAdd, checkJwt, async (req, res) => {
// server.post(recipeAdd, async (req, res) => {

  const { recipeId, title, imageUrl } = req.body
  const auth0Id = req.user?.sub
  console.log(auth0Id)

  const newRecipe = {
    auth0_id: auth0Id,
    recipe_id: recipeId,
    recipe_title: title,
    recipe_image_url: imageUrl
  }
  try {
    const recipe = await db.addRecipe(newRecipe)
    console.log(recipe)
    res.json({ recipe })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

server.get(userRecipes, checkJwt, async (req, res) => {
  const auth0Id = req.user?.sub
  try {
    const recipe = await db.getRecipe(auth0Id)
    res.json({ recipe })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = server
