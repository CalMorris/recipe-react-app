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
    console.log(recipe)
    return <RecipeCard
      key={i}
      dietLabels={recipe.dietLabels}
      image={recipe.image}
      label={recipe.label}
      mealType={recipe.mealType}/>
  })
  // console.log(recipes)
  return (<>
    <RecipeSearch handleSubmit={handleSubmit}/>
    {recipeList}
  </>
  )
}

export default App

// dietLabels []
// image
// mealType []
// label
