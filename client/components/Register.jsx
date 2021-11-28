import React, { useEffect } from 'react'
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

  // useEffect(() => {
  //   console.log(userData, user?.token)
  //   // addUser(userData, user?.token)
  //   //   .then(history.push('/'))
  //   // .catch(error => console.log(error.message))
  // }, [user])

  setTimeout(() => {
    console.log(user)
    console.log(userData)
    addUser(userData, user?.token)
      .then(history.push('/'))
      .catch(error => console.log(error.message))
  }, 3000)

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
