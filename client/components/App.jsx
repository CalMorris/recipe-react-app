import React, { useState, useEffect } from 'react'
import { getRecipes } from '../apiClient'

import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'

const App = () => {
  const [keywords, setKeywords] = useState('')
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes(keywords)
      .then((recipeList) => {
        console.log(recipeList)
        setRecipes(recipeList)
        return null
      })
      .catch(err => console.log(err))
  }, [keywords])

  function handleSubmit (event, formValue) {
    event.preventDefault()
    setKeywords(formValue)
    event.target.reset()
  }

  const recipeList = recipes.map(({ recipe }, i) => {
    return <RecipeCard
      key={i}
      dietLabels={recipe.dietLabels}
      image={recipe.image}
      label={recipe.label}
      totalTime={recipe.totalTime}
      dishType={recipe.dishType}/>
  })
  // console.log(recipes)
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

export default App
