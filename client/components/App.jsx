import React from 'react'
import { Route, Routes, HashRouter as Router } from 'react-router-dom'

import { cacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'
import Home from './Home'
import { Recipe } from './Recipe'
import Nav from './Nav'
import UserRecipes from './UserRecipes'
// import { Register } from './Register'
import Register from './Register'

function App () {
  cacheUser(useAuth0)
  return (<>
    <Route path='/' component={Nav}></Route>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/recipe/:id' component={Recipe}></Route>
    <Route exact path='/register' component={Register}></Route>
    <Route exact path='/myrecipes' component={UserRecipes}></Route>
  </>)
}

export default App
