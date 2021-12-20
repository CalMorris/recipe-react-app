import React from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { Flex, Spacer, Box, Image, Link } from '@chakra-ui/react'

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
    <Flex height='40px' px={[2, 4, 8]} py='1' backgroundColor='white' borderBottomColor='green.600' borderBottomWidth='1px'>
      <Link href="/">
        <Image src="/images/food-logo.jpeg" alt="image of logo" objectFit='cover' height='100%'/>
      </Link>
      <Spacer/>
      <Box>
        <Link color='green.600' mx='2' href="/" className='text-green-700 px-4'>
          Home
        </Link>
        <IfAuthenticated>
          <Link mx='2' href='/#/myrecipes' className='text-green-700 px-4' >
            My Recipes
          </Link>
          <Link mx='2' href='/' className='text-gray-500 px-4' onClick={handleLogoff}>
            Logout
          </Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link mx='2' href='/' className= 'px-4' onClick={handleRegister}>
            Register
          </Link>
          <Link mx='2' href='/' className= 'px-4' onClick={handleSignIn}>
            Sign in
          </Link>
        </IfNotAuthenticated>
      </Box>
    </Flex>
  )
}
