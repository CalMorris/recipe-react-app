import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchRecipes } from '../apiClient/recipes'
import RecipeCard from './RecipeCard'

export default function UserRecipes () {
  const recipes = useSelector(state => state.recipes)

  const recipeList = recipes.map(({ image, id, title }) => {
    return <RecipeCard
      key={`${id}-${title}`}
      id={id}
      image={image}
      title={title}
    />
  })

  // recipeList ? console.log('yes') : console.log('no')s

  return (
    <>
      <div className='grid grid-cols-3 gap-10 mt-20 px-40'>
        {recipeList || <p> try aagain </p>}
        {/* // double check this */}
      </div>

    </>
  )
}
