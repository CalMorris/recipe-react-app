import React, { useEffect, useState } from 'react'
import { getRecipe } from '../apiClient/spoonacular'
import { PillLabel } from './PillLabel'
import { useSelector, useDispatch } from 'react-redux'
import { IfAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { addRecipeState, removeRecipeState } from '../actions/recipes'
import { addRecipeClient, removeRecipeClient } from '../actions/client'

export function convertMinsToDisplayTime (minutes) {
  const hours = Math.floor(parseInt(minutes) / 60)
  const hoursMinutes = parseInt(minutes) - (hours * 60)

  if (hours > 0 && hoursMinutes === 0) {
    if (hours === 1) {
      return minutes
    } else {
      return `${String(hours)} hrs`
    }
  } else if (hours === 0 && hoursMinutes < 60) {
    return `${minutes} mins`
  } else if (hours > 1 && hoursMinutes < 60) {
    return `${String(hours)} hrs ${String(hoursMinutes)} mins`
  } else {
    return `${String(hours)} hr ${String(hoursMinutes)} mins`
  }
}

export function roundIngredientMetric (ingredient) {
  const ingredientFloat = parseFloat(ingredient)
  return String(Math.floor(ingredientFloat))
}

function displayIngredients (ingrediets) {
  return ingrediets.map(ingredient => {
    return <p className='font-sans' key={ingredient.nameClean} >{roundIngredientMetric(ingredient.measures.metric.amount)} {ingredient.measures.metric.unitShort} {ingredient.nameClean}</p>
  })
}

export function formatMethod (instructionList) {
  const seperateSentances = instructionList.split('.')
  return seperateSentances.slice(0, -1)
}

export function Recipe (props) {
  const url = props.match.url
  const recipeId = url.slice(8)
  const token = useSelector(state => state.user.token)
  const recipes = useSelector(state => state.recipesClient) // recipes live here

  const [userRecipeSaved, setUserRecipeSaved] = useState(false) // truthy value

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const [recipe, setRecipe] = useState(
    {
      analyzedInstructions: [],
      cuisines: [],
      diets: [],
      dishTypes: [],
      extendedIngredients: [],
      occasions: [],
      pairedWines: {},
      productMatches: [],
      instructions: ''
    })

  useEffect(() => {
    const isSaved = recipes.some(recipe => recipe.recipeId === recipeId)
    setUserRecipeSaved(isSaved)
    getRecipe(recipeId)
      .then(result => {
        setRecipe(result)
        setLoading(false)
        return null
      })
      .catch(error => console.log(error))
  }, [userRecipeSaved, recipes])

  const cuisines = recipe.cuisines.map((cuisine, index) => {
    return <PillLabel key={`${index}-${cuisine}`} label={cuisine}/>
  })

  const healthLabels = recipe.diets.map((label, index) => {
    if (index < 2) return <PillLabel key={`${index}-${label}`} label={label}/>
  })

  let instructions
  if (recipe.instructions) {
    const instructionList = formatMethod(recipe.instructions)
    instructions = instructionList.map((instruction) => <li key={instruction}>{ instruction }.</li>)
  } else {
    instructions = []
  }

  return (<>
    <div className='flex justify-center mt-20'>
      {loading && <img src='/images/loading.gif'className='w-3/6'/>}
    </div>

    { !loading &&
      <div className=' mb-20 mt-20 px-28'>
        <div className='bg-white grid grid-cols-2 gap-2'>

          <div className=' h-full'>
            <img src={recipe.image} alt={recipe.title} className="object-cover w-full"/>
          </div>
          <div className='px-10 py-2 grid space-between gap-4'>
            <div>
              <div>
                <h1 className='font-sans text-green-700 text-4xl'>{recipe.title}</h1>
                <a href={recipe.sourceUrl}>
                  <p className='font-serif text-gray-600 '>{recipe.sourceName}</p>
                </a>
              </div>
              <div className='mt-5 grid grid-cols-2'>
                <div>
                  <p className='font-sans text-green-700'>🕔 {convertMinsToDisplayTime(recipe.readyInMinutes)}</p>
                  <p className='my-2 font-sans text-green-700'>🍴 {recipe.servings} servings</p>
                </div>
                <div className='grid justify-items-end'>
                  <p>
                    {cuisines}
                  </p>
                </div>
              </div>
            </div>
            <div className='self-start'>
              {displayIngredients(recipe.extendedIngredients)}
            </div>
            <div className='max-w-full'>
              {healthLabels}
            </div>
            <IfAuthenticated>
              {userRecipeSaved ? <button onClick={() => {
                dispatch(removeRecipeState(recipeId, token))
                dispatch(removeRecipeClient(recipeId))
              }} className='w-2/6 font-sans flex-none text-white px-8 py-2 bg-red-400 rounded'>Remove</button>
                : <button onClick={() => {
                  dispatch(addRecipeState(recipeId, recipe.title, recipe.image, token))
                  dispatch(addRecipeClient({ recipeId, title: recipe.title, image: recipe.image }))
                }} className='w-2/6 font-sans flex-none text-white px-8 py-2 bg-green-700 rounded'>Save</button>}
            </IfAuthenticated>
          </div>
        </div>
        <div className='mt-20'>
          <h1 className='font-sans text-4xl text-center'>Method</h1>
          <div className='px-20'>
            <ol className='list-outside list-decimal' >
              {instructions}
            </ol>
          </div>
        </div>
      </div>}
  </>
  )
}
