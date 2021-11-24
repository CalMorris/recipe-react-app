import request from 'superagent'

const users = '/api/v1/users'

export async function addUser (user) {
  return request.post(users)
    .send(user)
    .catch(err => console.log(err.message))
}
