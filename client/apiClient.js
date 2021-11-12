import request from 'superagent'

const recipesUrl = 'http://localhost:3000/api/v1/recipes'

export function getRecipes () {
  return request.get(recipesUrl)
    .then(res => console.log(res.body.hits))
}
