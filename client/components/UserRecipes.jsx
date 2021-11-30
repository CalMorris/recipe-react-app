import React from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from './RecipeCard'

export default function UserRecipes () {
  const recipes = useSelector(state => state.recipes)
  const recipeList = recipes.map(({ image, recipeId, title }) => {
    return <RecipeCard
      key={`${recipeId}`}
      id={recipeId}
      image={image}
      title={title}
    />
  })

  return (
    <>
      <div className='grid grid-cols-3 gap-10 mt-20 px-40'>
        {recipeList}
      </div>

    </>
  )
}
