import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeCard ({ id, image, title, likes }) {
  return (<Link to={`/recipe/${id}`}>
    <div className='filter hover:text-green-700 transition duration-500 ease-in-out'>

      <div className=''>
        <img className='object-cover h-80' src={image} alt={title} />
      </div>
      <h2 className=" font-sans pt-4">{title}</h2>
    </div>
  </Link>
  )
}
