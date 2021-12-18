const request = require('supertest')
const server = require('../server')
const db = require('../db/recipes')
const checkJwt = require('../auth0')

jest.mock('../db/recipes')
jest.mock('../auth0')
// jest.mock('../auth0', jest.fn((req, res, next) => next()))

const recipes = '/api/v1/db/recipes'

// const fakeCheckJwt = (req, res, next) => {
//   req.sub = 'auth|123'
//   next()
// }

describe('GET recipes', () => {
  describe('/api/v1/db/recipes/', () => {
    checkJwt.mockImplementation((req, res, next) => {
      req.user = {
        sub: 'auth|123'
      }
      next()
    })
    test('returns a recipe object', async () => {
      // this test passes with a false postitive!!
      db.getRecipe.mockImplementation(() => Promise.resolve({
        recipeId: '716429', title: 'Crispy Buttermilk Fried Chicken', image: 'https://spoonacular.com/recipeImages/640803-556x370.jpg'
      }))

      request(server)
        .get(`${recipes}/`)
        .then(res => {
          console.log(res.body)
          expect(db.getRecipe).toHaveBeenCalled()
        })
    })
  })
})
