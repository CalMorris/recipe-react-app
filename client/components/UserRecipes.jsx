import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchRecipes } from '../apiClient/db'
import RecipeCard from './RecipeCard'

export default function UserRecipes () {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const token = useSelector(state => state.token)

  useEffect(() => {
    setLoading(true)
    fetchRecipes(token)
      .then(result => {
        setRecipes(result)
        setLoading(false)
        return null
      })
      .catch(err => console.log(err.message))
  }, [])

  const recipeList = recipes.map(({ image, id, title }) => {
    return <RecipeCard
      key={`${id}-${title}`}
      id={id}
      image={image}
      title={title}
    />
  })

  return (
    <>
      <div className='flex justify-center mt-20'>
        {loading && <img src='/images/loading.gif'className='w-3/6'/>}
      </div>
      <div className='grid grid-cols-3 gap-10 mt-20 px-40'>
        {recipeList}
      </div>

    </>
  )
}
