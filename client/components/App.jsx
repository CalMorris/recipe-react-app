import React, { useState, useEffect } from 'react'
import { getRecipes } from '../apiClient'

const App = () => {
  const [greeting, setGreeting] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    getRecipes()
      .then((recipe) => {
        console.log(recipe)
      })
      .catch(err => console.log(err))
  })

  return (
    <>
      {count}
      <h1 className='text-yellow-50'>{greeting}</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </>
  )
}

export default App
