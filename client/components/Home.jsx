import React, { useState, useEffect } from 'react'
import { getRecipes } from '../apiClient/spoonacular'
import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'
import { useAuth0 } from '@auth0/auth0-react'
import { setRecipesState } from '../actions/recipes'
import { useSelector, useDispatch } from 'react-redux'

import { Box, Container, Flex, SimpleGrid } from '@chakra-ui/react'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth0()
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    isAuthenticated && dispatch(setRecipesState(token))
  }, [token])

  function handleSubmit (event, keywords) {
    event.preventDefault()
    setLoading(true)
    getRecipes(keywords)
      .then((recipeList) => {
        setRecipes(recipeList)
        setLoading(false)
        return null
      })
      .catch(err => console.log(err))
    event.target.reset()
  }

  const recipeList = recipes.map(({ image, id, title, likes }) => {
    return <RecipeCard h='100%'
      key={`${id}-${title}`}
      id={id}
      image={image}
      title={title}
      likes={likes}
    />
  })

  return (<>
    <Box height='100%' px={[4, 6, 20, 40]} h='90vh ' backgroundImage='url(/images/bg.jpg)' backgroundPosition="center"
      backgroundRepeat="no-repeat" backgroundSize='cover'>
      <Flex justify='center' pt={[36, 44, 60]}>
        <RecipeSearch handleSubmit={handleSubmit}/>
      </Flex>

      <Box mt={[16, 20, 24, 30]}>
        <Container maxW='700px' centerContent>
          {loading && <img src='/images/loading.gif'/>}
        </Container>
      </Box>

      <Box mt={[16, 20, 24, 30]} centerContent>
        <SimpleGrid maxW='1300px' minChildWidth='250px' gap={8} centerContent justifyContent='center'>
          {!loading && recipeList}
        </SimpleGrid>
      </Box>
    </Box>
  </>
  )
}

export default Home
