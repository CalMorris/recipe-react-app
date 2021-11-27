import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { addUser } from '../apiClient/users'

function Register () {
  const user = useSelector(state => state)
  const history = useHistory()

  const userData = {
    auth0Id: user?.auth0Id,
    email: user?.email
  }

  useEffect(() => {
    console.log(userData, user?.token)
    addUser(userData, user?.token)
      .then(history.push('/'))
      .catch(error => console.log(error.message))
  }, [user])

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
