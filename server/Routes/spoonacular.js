const express = require('express')
const request = require('superagent')
const router = express.Router()

// GET /api/v1/welcome/
// router.get('/id', (req, res) => {
//   try {
//     res.json({ statement: 'Welcome to external APIs!' })
//   } catch (err) {
//     res.status(500).send(err.message)
//   }
// })

router.get('/id', (req, res) => {
  const id = req.headers.id
  request.get(`https://api.spoonacular.com/recipes/${id}/information`)
    .query({
      ContentType: 'application/json',
      apiKey: '1d49f111f2564f1ca8b4f3582bf55d79'
    })
    .then(result => res.json(result.body))
    .catch(err => console.log(err))
})

router.get('/recipes', (req, res) => {
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

module.exports = router
