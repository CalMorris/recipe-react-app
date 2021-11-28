import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { fetchRecipes } from '../apiClient/recipes'
import RecipeCard from './RecipeCard'

export default function UserRecipes () {
  const recipes = useSelector(state => state.recipes)
  const [isList, setIsList] = useState(false)
  // const [loading, is ]

  // useEffect(() => {

  // }
  // , [recipes])

  const recipeList = recipes.map(({ image, recipeId, title }) => {
    return <RecipeCard
      key={`${recipeId}`}
      id={recipeId}
      image={image}
      title={title}
    />
  })

  // if (recipes[0].title === '') {
  //   setIsList(true)
  // }

  // console.log(recipes)

  return (
    <>
      <div className='grid grid-cols-3 gap-10 mt-20 px-40'>
        {recipeList}
        {/* {isList && <p> try again </p>} */}
      </div>

    </>
  )
}
