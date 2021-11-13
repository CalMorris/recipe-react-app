const request = require('superagent')
const path = require('path')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const server = express()
const recipesUrl = '/api/v1/recipes'

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
    .then(result => {
      res.json(result.body.hits)
      return null
    })
    .catch(err => console.log(err))
})

module.exports = server
