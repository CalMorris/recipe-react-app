const express = require('express')
const request = require('superagent')
const router = express.Router()
require('dotenv').config()

router.get('/id', (req, res) => {
  const id = req.query.id
  request.get(`https://api.spoonacular.com/recipes/${id}/information`)
    .query({
      ContentType: 'application/json',
      apiKey: process.env.API_KEY
    })
    .then(result => res.json(result.body))
    .catch(err => {
      console.log('this does not work')
      res.status(500).send('Error connecting to API')
    })
})

router.get('/recipes', (req, res) => {
  const keywords = formatKeywords(req.query.keywords)
  request.get('https://api.spoonacular.com/recipes/findByIngredients')
    .query({
      ContentType: 'application/json',
      apiKey: process.env.API_KEY,
      ingredients: keywords,
      number: '15'
    })
    .then(result => res.json(result.body))
    .catch(err => {
      res.status(500).send('Error connecting to API')
    })
})

function formatKeywords (keywords) {
  const splitBySpace = keywords.split(' ')
  const stringByComma = splitBySpace.join(',')
  return stringByComma
}

module.exports = router
