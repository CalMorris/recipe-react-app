const testDb = require('./connectionTestDB')
const { createUser } = require('./users')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('createUser', () => {
  test('adds a user to the database', () => {
    expect.assertions(1)
    const user = { auth0_id: 'auth|2', email: 'testdb@user.com' }
    return createUser(user, testDb)
      .then(id => expect(id[0]).toEqual(2))
  })
})
