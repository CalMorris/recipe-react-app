const connection = require('./connection')

function createUser (user, db = connection) {
  return db('users')
    .insert(user, 'id')
}

module.exports = {
  createUser
}
