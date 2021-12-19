import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Image, Flex, Spacer, Heading } from '@chakra-ui/react'

export default function RecipeCard ({ id, image, title, likes }) {
  return (<Link to={`/recipe/${id}`} w='100%' h='100%'
  >
    <Flex direction='column' h='100%' >
      <Box>
        <Heading as='h4' size='sm' py='4' color='gray.700' >{title}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Image htmlWidth='100%' objectFit='cover' src={image} alt={title} />
      </Box>
    </Flex>
  </Link>
  )
}
