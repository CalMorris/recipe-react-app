const express = require('express')
const router = express.Router()
const db = require('../db/users')

router.post('/add', async (req, res) => {
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

module.exports = router
