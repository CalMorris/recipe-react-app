import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { addUser } from '../apiClient/users'

function Register () {
  const user = useSelector(state => state.user)
  const history = useHistory()

  const userData = {
    auth0Id: user?.auth0Id,
    email: user?.email
  }

  addUser(userData, user?.token)
    .then(history.push('/'))
    .catch(error => console.log(error.message))

  return (
    <>
      <div className='h-screen ' >
        <div className='flex justify-center mt-20'>
          {<img src='/images/loading.gif'className='w-3/6'/>}
        </div>
      </div>
    </>
  )
}

export default Register
