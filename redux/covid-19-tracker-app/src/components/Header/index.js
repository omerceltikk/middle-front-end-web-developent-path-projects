import React from 'react'
import { Heading,Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Header() {
  return (
    <div>
      
        <Heading m={12} as="h1" size="4xl">COVİD - 19</Heading>
        <Text fontSize='lg' m={5} as="b">Global And Country Wise Cases Of CoronaVirus</Text>
        <br></br>
        <br></br>
        <Text fontSize='lg' m={5} as="i">(For A Particlar select a Country from below.)</Text>
    </div>
  )
}

export default Header