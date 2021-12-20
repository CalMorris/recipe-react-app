import React, { useEffect, useState } from 'react'
import { getRecipe } from '../apiClient/spoonacular'
import { PillLabel } from './PillLabel'
import { useSelector, useDispatch } from 'react-redux'
import { IfAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { addRecipeState, removeRecipeState } from '../actions/recipes'
import { addRecipeClient, removeRecipeClient } from '../actions/client'

import { Stack, Box, Container, SimpleGrid, Text, Heading, Image, Link, UnorderedList, ListItem } from '@chakra-ui/react'

export function convertMinsToDisplayTime (minutes) {
  const hours = Math.floor(parseInt(minutes) / 60)
  const hoursMinutes = parseInt(minutes) - (hours * 60)

  if (hours > 0 && hoursMinutes === 0) {
    if (hours === 1) {
      return minutes
    } else {
      return `${String(hours)} hrs`
    }
  } else if (hours === 0 && hoursMinutes < 60) {
    return `${minutes} mins`
  } else if (hours > 1 && hoursMinutes < 60) {
    return `${String(hours)} hrs ${String(hoursMinutes)} mins`
  } else {
    return `${String(hours)} hr ${String(hoursMinutes)} mins`
  }
}

export function roundIngredientMetric (ingredient) {
  const ingredientFloat = parseFloat(ingredient)
  return String(Math.floor(ingredientFloat))
}

function displayIngredients (ingrediets) {
  return ingrediets.map(ingredient => {
    return <p className='font-sans' key={ingredient.nameClean} >{roundIngredientMetric(ingredient.measures.metric.amount)} {ingredient.measures.metric.unitShort} {ingredient.nameClean}</p>
  })
}

export function formatMethod (instructionList) {
  const seperateSentances = instructionList.split('.')
  return seperateSentances.slice(0, -1)
}

export function Recipe (props) {
  const url = props.match.url
  const recipeId = url.slice(8)
  const token = useSelector(state => state.user.token)
  const recipes = useSelector(state => state.recipesClient) // recipes live here

  const [userRecipeSaved, setUserRecipeSaved] = useState(false) // truthy value

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const [recipe, setRecipe] = useState(
    {
      analyzedInstructions: [],
      cuisines: [],
      diets: [],
      dishTypes: [],
      extendedIngredients: [],
      occasions: [],
      pairedWines: {},
      productMatches: [],
      instructions: ''
    })

  useEffect(() => {
    const isSaved = recipes.some(recipe => recipe.recipeId === recipeId)
    setUserRecipeSaved(isSaved)
    getRecipe(recipeId)
      .then(result => {
        setRecipe(result)
        setLoading(false)
        return null
      })
      .catch(error => console.log(error))
  }, [userRecipeSaved, recipes])

  const cuisines = recipe.cuisines.map((cuisine, index) => {
    return <PillLabel key={`${index}-${cuisine}`} label={cuisine}/>
  })

  const healthLabels = recipe.diets.map((label, index) => {
    if (index < 2) return <PillLabel key={`${index}-${label}`} label={label}/>
  })

  let instructions
  if (recipe.instructions) {
    const instructionList = formatMethod(recipe.instructions)
    instructions = instructionList.map((instruction) => <ListItem key={instruction}>{ instruction }.</ListItem>)
  } else {
    instructions = []
  }

  return (<>
    <Container maxW='900px' centerContent>

      <Box mt={[4, 10, 24, 30]}>
        {loading && <Image src='/images/loading.gif' maxW='700px'/>}
      </Box>

      { !loading &&
      // <Box mt={[16, 20, 24, 30]}>
        <Box mt={[4, 10, 24, 30]}>
          <Stack spacing='4' direction={['column', 'column', 'row']} backgroundColor={'white'}>
            {/* <Stack > */}
            <Box h='100%'>
              <Image src={recipe.image} alt={recipe.title} objectFit='cover' w='100%'/>
            </Box>
            <Box w='50%' px={[4, 6]} py={[2, 3, 4]} >
              <Box>
                <Box>
                  <Heading as='h2' size='lg' color='green.600'>{recipe.title}</Heading>
                  <Link href={recipe.sourceUrl} color='gray.600' py={[1, 2]}>
                    {recipe.sourceName}
                  </Link>
                </Box>
                <SimpleGrid columns='2'>
                  <Box py={[1, 2]}>
                    <Text color='green.700'>🕔 {convertMinsToDisplayTime(recipe.readyInMinutes)}</Text>
                    <Text color='green.700'>🍴 {recipe.servings} servings</Text>
                  </Box>
                  <Box>
                    <Text backgroundColor='green.600' color='white' borderRadius='15px' align='center'>
                      {cuisines}
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
              <Box className='self-start'>
                {displayIngredients(recipe.extendedIngredients)}
              </Box>
              <Box className='max-w-full'>
                {healthLabels}
              </Box>
              <IfAuthenticated>
                {userRecipeSaved ? <button onClick={() => {
                  dispatch(removeRecipeState(recipeId, token))
                  dispatch(removeRecipeClient(recipeId))
                }} className='w-2/6 font-sans flex-none text-white px-8 py-2 bg-red-400 rounded'>Remove</button>
                  : <button onClick={() => {
                    dispatch(addRecipeState(recipeId, recipe.title, recipe.image, token))
                    dispatch(addRecipeClient({ recipeId, title: recipe.title, image: recipe.image }))
                  }} className='w-2/6 font-sans flex-none text-white px-8 py-2 bg-green-700 rounded'>Save</button>}
              </IfAuthenticated>
            </Box>
          </Stack>
          <Box mt={[6, 10, 20]} px={[2, 4, 8, 10]}>

            <Heading align={['left', 'center']} as='h2' size='lg' p={[2, 4]} color='green.600'>Method</Heading>
            <Box className='px-20'>
              <UnorderedList className='list-outside list-decimal' >
                {instructions}
              </UnorderedList>
            </Box>
          </Box>
        </Box>}
    </Container>
  </>
  )
}
