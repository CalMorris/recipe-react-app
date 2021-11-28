import { setUser } from './actions/user'
import store from './store'
import { useAuth0 } from '@auth0/auth0-react'
import { setRecipesState } from './actions/recipes'

export async function cacheRecipe (useAuth0, state) {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()

  if (isAuthenticated && !state?.token) {
    const token = await getAccessTokenSilently()
    try {
      const userToSave = {
        auth0Id: user.sub,
        email: user.email,
        token: token
      }
      store.dispatch(setUser(userToSave))
      store.dispa
    } catch (err) {
      console.error(err)
    }
  }
}
