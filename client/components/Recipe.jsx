import React, { useEffect, useState } from 'react'
import { getRecipe } from '../apiClient'
import { PillLabel } from './PillLabel'
import Nav from './Nav'

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

function displayHealthLabels (labels) {
  const firstThreeLabels = labels.filter((label, i) => i <= 2)
  return firstThreeLabels.map(label => {
    const splitLabel = label.split('-')
    const newLabel = splitLabel.join(' ')
    return <PillLabel key={label} label={newLabel}
    />
  })
}

function displayIngredients (ingrediets) {
  return ingrediets.map(ingredient => {
    return <p className='font-sans' key={ingredient}>{ingredient}</p>
  })
}

export function Recipe (props) {
  const url = props.match.url
  const recipeId = url.slice(1)
  const [recipe, setRecipe] = useState({ cuisineType: [], healthLabels: [], ingredientLines: [], image: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecipe(recipeId)
      .then(result => {
        setRecipe(result)
        setLoading(false)
        return null
      })
      .catch(error => console.log(error))
  }
  , [])

  const cuisines = recipe.cuisineType.map(cuisine => {
    return <PillLabel key={cuisine} label={cuisine}/>
  })

  console.log(recipe)

  return (<>
    <Nav />

    <div className='flex justify-center mt-20'>
      {loading && <img src='/loading.gif'className='w-3/6'/>}
    </div>

    { !loading &&
      <div className=' pb-20 mt-20 px-40'>
        <div className='bg-white grid grid-cols-2 gap-2'>

          <div className=' h-full'>
            <img src={recipe.image} alt={recipe.label} className="object-cover w-full"/>
          </div>
          <div className='px-10 py-2 grid space-between gap-4'>
            <div>
              <div>
                <h1 className='font-sans text-green-700 text-4xl'>{recipe.label}</h1>
                <a href={recipe.url}>
                  <p className='font-serif text-gray-600 '>by {recipe.source}</p>
                </a>
              </div>
              <div className='mt-5 grid grid-cols-2'>
                <div>
                  <p className='font-sans text-green-700'>🕔 {convertMinsToDisplayTime(recipe.totalTime)}</p>
                  <p className='my-2 font-sans text-green-700'>🍴 {recipe.yield} servings</p>
                </div>
                <div className='grid justify-items-end'>
                  <p>
                    {cuisines}
                  </p>
                </div>
              </div>
            </div>
            <div className='self-start'>
              {displayIngredients(recipe.ingredientLines)}
            </div>
            <div className='self-end'>
              {displayHealthLabels(recipe.healthLabels)}
            </div>
          </div>
        </div>
        <div className='mt-20'>
          <h1 className='font-sans text-4xl text-center'>Method</h1>
          <div className='px-20'>
            <ol className='list-outside list-decimal'>
              <li className="font-sans text-lg mt-5">
        Lorem ipsum dolor sit amet. Sit nihil modi est doloremque ipsa in eaque consectetur et quia rerum aut quod autem. Et nihil commodi nam deserunt laudantium iste perspiciatis sed voluptatum minus. Ea vero dolore et debitis vitae eum galisum molestias.
              </li>
              <li className="font-sans text-lg mt-5">
          Sed voluptas corrupti ex sint repellat At asperiores ipsam sit omnis dolor aut debitis totam. Aut quaerat nisi sed sapiente atque est veritatis fugiat!
              </li>
              <li className="font-sans text-lg mt-5">
          Aut quisquam voluptas aut esse veniam est quidem accusantium in enim placeat. Non perferendis molestias id iusto unde quo incidunt soluta. Cum iure adipisci vel nobis voluptatem aut sunt libero. Aut laboriosam quam est earum neque in ipsa enim eum dolor consectetur.
              </li>
              <li className="font-sans text-lg mt-5">
        Lorem ipsum dolor sit amet. Sit nihil modi est doloremque ipsa in eaque consectetur et quia rerum aut quod autem. Et nihil commodi nam deserunt laudantium iste perspiciatis sed voluptatum minus. Ea vero dolore et debitis vitae eum galisum molestias.
              </li>
              <li className="font-sans text-lg mt-5">
        Lorem ipsum dolor sit amet. Sit nihil modi est doloremque ipsa in eaque consectetur et quia rerum aut quod autem. Et nihil commodi nam deserunt laudantium iste perspiciatis sed voluptatum minus. Ea vero dolore et debitis vitae eum galisum molestias.
              </li>
            </ol>
          </div>
        </div>
      </div>}
  </>
  )
}
