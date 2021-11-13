import request from 'superagent'

const recipesUrl = 'http://localhost:3000/api/v1/recipes'

export function getRecipes (query) {
  return request.get(recipesUrl)
    .set('keywords', query)
    .then(res => res.body)
    .catch(error => console.log(error))
}
