import request from 'superagent'

const usersRoute = '/api/v1/users'

export async function addUser (user) {
  return request.post(usersRoute)
    .send(user)
    .catch(err => console.log(err.message))
}
