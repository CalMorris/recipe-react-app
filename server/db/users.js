const connection = require('./connection')

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserByName (username, db = connection) {
  return db('users')
    .select()
    .where('username', username)
    .first()
}

function createUser (user, db = connection) {
  return db('users')
    .insert(user, 'id')
}

module.exports = {
  userExists,
  getUserByName,
  createUser
}
