import React from 'react'
import { Heading, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
function Header() {
const score = useSelector(state => state.data.score)
  return (
    <>
    <Heading marginTop="20" as="h2">Memory Card Game</Heading>
    <Heading color="#DDD" mt="10" as="h4">Score: {score}</Heading>
    </>
    
  )
}

export default Header