import React, { useState, useEffect } from 'react'
import { getRecipes } from '../apiClient'

import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'
// import Nav from './Nav'

// import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const [keywords, setKeywords] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRecipes(keywords)
      .then((recipeList) => {
        setRecipes(recipeList)
        setLoading(false)
        return null
      })
      .catch(err => console.log(err))
  }, [keywords])

  function handleSubmit (event, formValue) {
    event.preventDefault()
    setKeywords(formValue)
    setLoading(true)
    event.target.reset()
  }

  const recipeList = recipes.map(({ image, id, title, likes }) => {
    return <RecipeCard
      key={id}
      id={id}
      image={image}
      title={title}
      likes={likes}
    />
  })

  return (<>
    {/* <Nav/> */}
    <div className='h-screen bg-cover bg-no-repeat bg-center' style={{ backgroundImage: 'url(/bg.png)' }}>
      <RecipeSearch handleSubmit={handleSubmit}/>

      <div className='flex justify-center mt-20'>
        {loading && <img src='/loading.gif'className='w-3/6'/>}
      </div>
      <div className='grid grid-cols-3 gap-10 mt-20 px-40'>
        {recipeList}
      </div>
    </div>
  </>
  )
}

export default Home
