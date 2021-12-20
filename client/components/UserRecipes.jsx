import React from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from './RecipeCard'
import { Box, SimpleGrid } from '@chakra-ui/react'

export default function UserRecipes () {
  const recipes = useSelector(state => state.recipes)
  const recipeList = recipes.map(({ image, recipeId, title }) => {
    return <RecipeCard
      key={`${recipeId}`}
      id={recipeId}
      image={image}
      title={title}
    />
  })

  return (
    <>
      <Box mt={[16, 20, 24, 30]} centerContent px={[2, 4, 6, 20, 30]}>
        <SimpleGrid maxW='1300px' minChildWidth='250px' gap={8} centerContent justifyContent='center'>
          {recipeList}
        </SimpleGrid>
      </Box>

    </>
  )
}
