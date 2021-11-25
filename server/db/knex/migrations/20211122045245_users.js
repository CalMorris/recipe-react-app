exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth0_id')
    table.string('email')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}