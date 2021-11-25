import React, { useEffect, useState } from 'react'
import { getRecipe } from '../apiClient/spoonacular'
import { addRecipe, fetchRecipes, deleteRecipe } from '../apiClient/db'
import { PillLabel } from './PillLabel'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated } from './Authenticated'

function convertMinsToDisplayTime (minutes) {
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
  } else {
    return `${String(hours)} hr ${String(hoursMinutes)} mins`
  }
}

function displayIngredients (ingrediets) {
  return ingrediets.map(ingredient => {
    return <p className='font-sans' key={ingredient} >{ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort} {ingredient.nameClean}</p>
  })
}

function formatMethod (instructionList) {
  const seperateSentances = instructionList.split('.')
  return seperateSentances.slice(0, -1)
}

function recipeIsSaved (recipeId, recipeList) {
  const findRecipe = recipeList.find(recipe => recipe.id === recipeId)
  if (findRecipe.length === 0) {
    return false
  } else {
    return true
  }
}

export function Recipe (props) {
  const url = props.match.url
  const recipeId = url.slice(8)
  const token = useSelector(state => state.token)
  const { isAuthenticated } = useAuth0()

  const [userRecipeSaved, setUserRecipeSaved] = useState(false)

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

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecipe(recipeId)
      .then(result => {
        setRecipe(result)
        setLoading(false)
        return null
      })
      .catch(error => console.log(error))
    fetchRecipes(token)
      .then(recipeList => {
        return setUserRecipeSaved(recipeIsSaved(recipeId, recipeList))
      })
      .catch(error => console.log(error))
  }
  , [userRecipeSaved])

  console.log(userRecipeSaved)

  const cuisines = recipe.cuisines.map(cuisine => {
    return <PillLabel key={cuisine} label={cuisine}/>
  })

  const healthLabels = recipe.diets.map(label => {
    return <PillLabel key={label} label={label}/>
  })

  function handleRecipeSave (

  ) {
    // addRecipe(recipeId, recipe.title, recipe.image, token)
  }

  const instructionList = formatMethod(recipe.instructions)
  const instructions = instructionList.map((instruction, index) => <li key={index}>{instruction}.</li>)
  return (<>
    <div className='flex justify-center mt-20'>
      {loading && <img src='/images/loading.gif'className='w-3/6'/>}
    </div>

    { !loading &&
      <div className=' pb-20 mt-20 px-28'>
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
            <div className='self-end'>
              {healthLabels}
            </div>
            <IfAuthenticated>
              {!userRecipeSaved && <button onClick={() => {
                setUserRecipeSaved(true)
                addRecipe(recipeId, recipe.title, recipe.image, token)
              }
              } className='font-sans flex-none text-white px-8 py-2 bg-green-700 rounded'>Save</button>}
              {userRecipeSaved && <button onClick={() => {
                setUserRecipeSaved(false)
                deleteRecipe(recipeId, token)
              }} className='font-sans flex-none text-white px-8 py-2 bg-red-400 rounded'>Remove</button>}
            </IfAuthenticated>
          </div>
        </div>
        <div className='mt-20'>
          <h1 className='font-sans text-4xl text-center'>Method</h1>
          <div className='px-20'>
            <ol className='list-outside list-decimal'>
              {instructions}
            </ol>
          </div>
        </div>
      </div>}
  </>
  )
}
