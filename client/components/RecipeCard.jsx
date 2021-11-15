import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeCard ({ dietLabels, image, dishType, label, recipeId }) {
  return (<Link to={`/${recipeId}`}>
    <div className='filter drop-shadow-lg'>
      <div className=''>
        <img className='object-cover w-full rounded-t' src={image} alt={label} />
      </div>
      <div className='rounded-b-lg px-4 py-2 height-34 border-t-2 bg-white text-green-700'>
        <h2 className="font-sans text-xl font-bold">{label}</h2>
        <p>{dietLabels}</p>
        <p className='text-gray-600'>{dishType}</p>
      </div>
    </div>
  </Link>
  )
}

// <a href={`/${recipeId}`}>
// </a>
