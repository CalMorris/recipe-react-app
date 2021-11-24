import { setUser } from './actions/user'
import store from './store'

export async function cacheUser (useAuth0, state) {
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
    } catch (err) {
      console.error(err)
    }
  }
}
