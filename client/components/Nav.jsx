import React from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Image } from '@chakra-ui/react'

export default function Nav () {
  const { logout, loginWithRedirect } = useAuth0()

  function handleLogoff (e) {
    e.preventDefault()
    logout()
  }

  function handleRegister (e) {
    e.preventDefault()
    loginWithRedirect({ redirectUri: `${window.location.origin}/#/register` })
  }

  function handleSignIn (e) {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <Box height='40px'>
      <a href="/">
        <Image src="/images/food-logo.jpeg" alt="image of logo" objectFit='cover' height='100%'/>
      </a>
      <div>

        <a href="/" className='text-green-700 px-4'>
      Home
        </a>
        <IfAuthenticated>
          <a href='/#/myrecipes' className='text-green-700 px-4' >My Recipes</a>
          <a href='/' className='text-gray-500 px-4' onClick={handleLogoff}>Logout</a>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <a href='/' className= 'px-4' onClick={handleRegister}>Register</a>
          <a href='/' className= 'px-4' onClick={handleSignIn}>Sign in</a>
        </IfNotAuthenticated>
      </div>
    </Box>
  )
}
