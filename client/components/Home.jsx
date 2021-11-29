import React, { useState, useEffect } from 'react'
import { getRecipes } from '../apiClient/spoonacular'
import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'
// import { fetchRecipes } from '../apiClient/recipes'
import { useAuth0 } from '@auth0/auth0-react'
import { setRecipesState } from '../actions/recipes'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth0()
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    isAuthenticated && dispatch(setRecipesState(token))
  }, [token])

  function handleSubmit (event, keywords) {
    event.preventDefault()
    setLoading(true)
    getRecipes(keywords)
      .then((recipeList) => {
        setRecipes(recipeList)
        setLoading(false)
        return null
      })
      .catch(err => console.log(err))
    event.target.reset()
  }

  const recipeList = recipes.map(({ image, id, title, likes }) => {
    return <RecipeCard
      key={`${id}-${title}`}
      id={id}
      image={image}
      title={title}
      likes={likes}
    />
  })

  return (<>
    <div className='h-screen bg-cover bg-no-repeat bg-center' style={{ backgroundImage: 'url(/images/bg.jpg)' }}>
      <RecipeSearch handleSubmit={handleSubmit}/>

      <div className='flex justify-center mt-20'>
        {loading && <img src='/images/loading.gif'className='w-3/6'/>}
      </div>
      <div className='grid grid-cols-1  sm:grid-cols-3 sm:gap-10 sm:mt-20 sm:px-40'>
        {recipeList}
      </div>
    </div>
  </>
  )
}

export default Home
