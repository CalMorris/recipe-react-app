import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Image, Flex, Spacer } from '@chakra-ui/react'

export default function RecipeCard ({ id, image, title, likes }) {
  return (<Link to={`/recipe/${id}`} w='100%' h='100%'
  >
    <Flex direction='column' h='100%' >
      <Box>
        <h2 font>{title}</h2>
      </Box>
      <Spacer />
      <Box>
        <Image htmlWidth='100%' objectFit='cover' src={image} alt={title} />
      </Box>
    </Flex>
  </Link>
  )
}
