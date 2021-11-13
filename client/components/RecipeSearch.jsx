import React, { useState } from 'react'

export default function RecipeSearch (props) {
  const [inputValue, setInputValue] = useState('')
  const { handleSubmit } = props

  function handleChange (event) {
    const { value } = event.target
    setInputValue(value)
  }

  return (<form onSubmit={(e) => handleSubmit(e, inputValue)}>
    <input placeholder="🔍 Search by Keyword" type="text" onChange={handleChange}/>
    <button type="submit">Search</button>
  </form>
  )
}
