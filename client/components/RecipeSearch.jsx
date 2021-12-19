import React, { useState } from 'react'
import { Box, Button, Input, Flex, Spacer, Heading } from '@chakra-ui/react'

export default function RecipeSearch (props) {
  const [inputValue, setInputValue] = useState('')
  const { handleSubmit } = props

  function handleChange (event) {
    const { value } = event.target
    setInputValue(value)
  }

  return (<>
    <Box width='100%' maxW="800px">
      <Heading>Find The Perfect Recipe</Heading>
      <form onSubmit={(e) => handleSubmit(e, inputValue)}>
        <Flex>
          <Input
            backgroundColor='white'
            borderColor='green.600'
            focusBorderColor='green.600'
            placeholder="🔍 Search by Keywords"
            type="text"
            onChange={handleChange}/>
          <Spacer/>
          <Button ml={[2, 4]} type='submit' backgroundColor='green.600' color='white' solid fontSize={['sm', 'md', 'lg', 'xl']}>
            Search
          </Button>
        </Flex>
      </form>
    </Box>
  </>
  )
}
