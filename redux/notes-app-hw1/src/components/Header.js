import { Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { searchText } from '../redux/notes/notesSlice'
import { useDispatch } from 'react-redux'

function Header() {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch();

    
  return (
    <div>
        <Heading mb={10}>
            Note App
        </Heading>
        <Input w="xl" variant='filled' placeholder='Search Your Note...' 
        onChange={(e) => dispatch(setSearch(e.target.value))}/>

    </div>
  )
}

export default Header