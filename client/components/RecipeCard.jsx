import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Image, Flex, Spacer } from '@chakra-ui/react'

export default function RecipeCard ({ id, image, title, likes }) {
  return (<Link to={`/recipe/${id}`} w='100%' h='100%'
  // className='grid justify-between items-end filter hover:text-green-700 transition duration-500 ease-in-out '
  >
    <Flex direction='column' h='100%' >
      <Box>
        <h2 className="grid self-start text-lg font-sans pb-1">{title}</h2>
      </Box>
      <Spacer />
      <Box>
        <Image htmlWidth='100%' objectFit='cover' src={image} alt={title} />
      </Box>
    </Flex>
  </Link>
  )
}
