import { combineReducers } from 'redux'

import user from './user'
import { recipes } from './recipes'
import { recipesClient } from './client'
export default combineReducers({
  user,
  recipes,
  recipesClient
})
