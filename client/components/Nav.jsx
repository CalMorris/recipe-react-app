import React from 'react'

export default function Nav () {
  return (
    <div className=' content-center px-10 h-12 border-b-2 border-green-700 py-2 border-opacity-50 bg-white flex justify-between'>
      <a href="/">
        <img className='h-full' src="/food-logo.jpeg" alt="image of logo" />
      </a>
      <a href="/" className='text-green-700'>
        <span>Home</span>
      </a>
    </div>
  )
}
