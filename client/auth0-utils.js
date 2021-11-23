import { setUser } from './actions/user'
import store from './store'

export async function cacheUser (useAuth0, state) {
  // TODO call the useAuth0 and destructure:
  // isAuthenticated, getAccessTokenSilently, user
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()

  // const isAuthenticated = false // <- TODO: delete this and use the value from useAuth0()
  if (isAuthenticated && !state?.token) {
    const token = await getAccessTokenSilently()
    try {
      const userToSave = {
        auth0Id: user.sub,
        email: user.email, // check ti make sure this works correctly
        token: token
      }

      store.dispatch(setUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}
