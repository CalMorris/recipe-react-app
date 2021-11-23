exports.up = function (knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id')
    table.string('auth0_id')
    table.string('recipe_id')
    table.string('recipe_title')
    table.string('recipe_image_url')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('recipes')
}
