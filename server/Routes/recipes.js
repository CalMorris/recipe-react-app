const express = require('express')
const router = express.Router()
const db = require('../db/users')
const checkJwt = require('../auth0')

router.post('/addrecipe', checkJwt, async (req, res) => {
  const { recipeId, title, imageUrl } = req.body
  const auth0Id = req.user?.sub
  const newRecipe = {
    auth0_id: auth0Id,
    recipe_id: recipeId,
    recipe_title: title,
    recipe_image_url: imageUrl
  }
  try {
    const recipe = await db.addRecipe(newRecipe)
    res.json({ recipe })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

router.get('/getrecipes', checkJwt, async (req, res) => {
  const auth0Id = req.user?.sub
  try {
    const recipe = await db.getRecipe(auth0Id)
    res.json({ recipe })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
