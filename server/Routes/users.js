const express = require('express')
const router = express.Router()
const db = require('../db/users')
const checkJwt = require('../auth0')

router.post('/', checkJwt, async (req, res) => {
  const newUser = req.body
  const auth0Id = req.user.sub
  const { email } = newUser
  const user = {
    auth0_id: auth0Id,
    email
  }
  console.log('add user route connection')
  try {
    await db.createUser(user)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

module.exports = router
