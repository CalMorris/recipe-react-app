const request = require('superagent')
const path = require('path')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const server = express()
const recipesUrl = '/api/v1/recipes'
const recipeUrl = '/api/v1/recipe'
const { readRecipes } = require('./cleanRecipes')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(cors('*'))

server.get(recipesUrl, (req, res) => {
  const keywords = req.headers.keywords
  request.get('https://api.edamam.com/api/recipes/v2')
    .query({
      Type: 'application/json',
      type: 'public',
      app_key: process.env.API_KEY,
      app_id: process.env.APP_ID,
      q: keywords
    })
    .then(result => res.json(readRecipes(result.body.hits))
    )
    .catch(err => console.log(err))
})

server.get(recipeUrl, (req, res) => {
  const id = req.headers.id
  request.get(`https://api.edamam.com/api/recipes/v2/${id}`)
    .query({
      Type: 'application/json',
      type: 'public',
      app_key: process.env.API_KEY,
      app_id: process.env.APP_ID
    })
    .then(result => res.json(result.body.recipe))
    .catch(err => console.log(err))
})

module.exports = server
