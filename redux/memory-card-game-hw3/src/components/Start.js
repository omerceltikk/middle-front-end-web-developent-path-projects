import { Center } from '@chakra-ui/react'
import React from 'react'
import { newGame } from '../redux/cardSlice'
import { useDispatch } from 'react-redux'
import { Button } from '@chakra-ui/react'

function Start() {
    const dispatch = useDispatch()
    
  return (
    <div className='start'>
        <Center>
        <Button  colorScheme='orange' size='lg'  onClick={(e) => dispatch(newGame(true))} >Start Game</Button>
        </Center>
    </div>
  )
}

export default Start