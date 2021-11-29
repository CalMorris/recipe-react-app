import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeCard ({ id, image, title, likes }) {
  return (<Link to={`/recipe/${id}`} className='grid justify-between items-end filter hover:text-green-700 transition duration-500 ease-in-out '>
    <h2 className="grid self-start text-lg font-sans pb-1">{title}</h2>
    <div className='grid'>
      <img className='object-cover h-80' src={image} alt={title} />
    </div>
  </Link>
  )
}
