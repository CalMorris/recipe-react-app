import React, { useState } from 'react'

export default function RecipeSearch (props) {
  const [inputValue, setInputValue] = useState('')
  const { handleSubmit } = props

  function handleChange (event) {
    const { value } = event.target
    setInputValue(value)``
  }

  return (<>
    <h1 className="text-center text-green-700 text-4xl">Lets Find The Perfect Recipe</h1>
    <div className='flex px-20 py-4'>
      <form className='flex gap-4 w-screen' onSubmit={(e) => handleSubmit(e, inputValue)}>
        <input className='focus:outline-none focus:ring-4 focus:ring-green-700 focus:ring-opacity-50 border-2 border-green-700 pl-4 flex-grow rounded'
          placeholder="🔍 Search by Keywords"
          type="text"
          onChange={handleChange}/>
        <button className='px-8 py-2 bg-green-700 rounded border-black flex-none font-sans text-white'
          type="submit">Search</button>
      </form>
    </div>
  </>
  )
}
