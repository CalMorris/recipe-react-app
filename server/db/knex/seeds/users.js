exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, auth0_id: 'auth|123', email: 'test@test.com' }
      ])
    })
}
