import React from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'


// import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Nav () {

  const { logout, loginWithRedirect } = useAuth0()
  // TODO: call the useAuth0 hook and destructure logout and loginWithRedirect
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
    <div className=' content-center px-10 h-12 border-b-2 border-green-700 py-2 border-opacity-50 bg-white flex justify-between'>
      <a href="/">
        <img className='h-full' src="/food-logo.jpeg" alt="image of logo" />
      </a>
      <div>
      
      <a href="/" className='text-green-700 px-4'>
      Home
      </a>
        <IfAuthenticated>
          <a href='/#/myrecipes' className='text-green-700 px-4' >My Recipes</a>
          <a href='/' className='text-gray-500 px-4' onClick={handleLogoff}>Log off</a>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <a href='/' className= 'px-4' onClick={handleRegister}>Register</a>
          <a href='/' className= 'px-4' onClick={handleSignIn}>Sign in</a>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}

