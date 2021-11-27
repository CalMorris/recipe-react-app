import { combineReducers } from 'redux'

import user from './user'
import { recipes } from './recipes'

// add isAuthenticated to local state, maybe?
export default combineReducers({
  user,
  recipes
})
