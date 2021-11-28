import request from 'superagent'

const users = '/api/v1/db/users'

export async function addUser (user, token) {
  return request.post(users)
    .set('authorization', `Bearer ${token}`)
    .send(user)
    .catch(err => console.log(err.message))
}
