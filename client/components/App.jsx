import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import { Recipe } from './Recipe'

function App () {
  return (<>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/:id' component={Recipe}></Route>
  </>)
}

export default App
