const path = require('path')
const express = require('express')

const spoonacular = require('./Routes/spoonacular')
const recipes = require('./Routes/recipes')
const users = require('./Routes/users')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use('/api/v1/spoonacular', spoonacular)
server.use('/api/v1/db/users', users)
server.use('/api/v1/db/recipes', recipes)

module.exports = server
