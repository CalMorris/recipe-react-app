// import React from 'react'

import * as React from 'react'

import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'

import { ChakraProvider } from '@chakra-ui/react'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain={'aihe-2021-callum.au.auth0.com'}
      clientId={'8AZOWvmpkrrEHNjpM3g0qkQsNOos74R8'}
      redirectUri={window.location.origin}
      audience='https://recipes.api'
    >
      <Provider store={store}>
        <Router>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Router>
      </Provider>
    </Auth0Provider>
    , document.getElementById('app')
  )
})
