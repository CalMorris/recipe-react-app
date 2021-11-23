exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { id: 1, auth0_id: 'auth|123', recipe_id: '716429', recipe_title: 'Crispy Buttermilk Fried Chicken', recipe_image_url: 'https://spoonacular.com/recipeImages/640803-556x370.jpg' }
      ])
    })
}
