const express = require('express')
const request = require('superagent')
const router = express.Router()
require('dotenv').config()

router.get('/id', (req, res) => {
  const id = req.headers.id
  request.get(`https://api.spoonacular.com/recipes/${id}/information`)
    .query({
      ContentType: 'application/json',
      apiKey: process.env.API_KEY
    })
    .then(result => res.json(result.body))
    .catch(err => console.log(err))
})

router.get('/recipes', (req, res) => {
  const keywords = req.headers.keywords
  request.get('https://api.spoonacular.com/recipes/findByIngredients')
    .query({
      ContentType: 'application/json',
      apiKey: process.env.API_KEY,
      ingredients: keywords,
      number: '20'
    })
    .then(result => res.json(result.body))
    .catch(err => console.log(err.message))
})

module.exports = router
