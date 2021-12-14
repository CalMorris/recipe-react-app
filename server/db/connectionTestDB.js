const knex = require('knex')
const config = require('./knexfile')
const testDb = knex(config.test)

module.exports = testDb
