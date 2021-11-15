import React, { useState, useEffect } from 'react'
import { getRecipes } from '../apiClient'

import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'

const Home = () => {
  const [keywords, setKeywords] = useState('')
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes(keywords)
      .then((recipeList) => setRecipes(recipeList))
      .catch(err => console.log(err))
  }, [keywords])

  function handleSubmit (event, formValue) {
    event.preventDefault()
    setKeywords(formValue)
    event.target.reset()
  }

  const recipeList = recipes.map(({ dietLabels, image, label, totalTime, recipeId, dishType }) => {
    return <RecipeCard
      key={recipeId}
      dietLabels={dietLabels}
      image={image}
      label={label}
      totalTime={totalTime}
      recipeId={recipeId}
      dishType={dishType}/>
  })

  return (<>
    <div>
      <RecipeSearch handleSubmit={handleSubmit}/>
    </div>
    <div className='grid grid-cols-4 gap-10 mt-20'>
      {recipeList}
    </div>
  </>
  )
}

export default Home
