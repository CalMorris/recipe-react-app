import React from 'react'

export default function RecipeCard ({ dietLabels, image, mealType, label }) {
  return (<div>
    <div><img src={image} alt={label} /></div>
    <div>
      <p>{label}</p>
      <p>{dietLabels}</p>
      <p>{mealType}</p>
    </div>
  </div>
  )
}
