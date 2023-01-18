import { useState } from 'react'
import { Textarea, Box, Circle, Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/notes/notesSlice';
import { nanoid } from '@reduxjs/toolkit';

function SectionText() {
    const [title, setTitle] = useState("");
    const [color ,setColor] = useState("#FAF8F1");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        if (!title) return;
        e.preventDefault();
        dispatch(addNote({id
            
            : nanoid() ,title,color}))
        setTitle("");
    }
    return (
        <div>
            <Box  >
                <form onSubmit={handleSubmit}>
                <Textarea 
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Write your notes here...' 
                mt={10} w="xl" background="rgb(280,280,280)"/>
                </form>
                <Box justifyContent="center" display="flex">
                    <Button 
                    variant='ghost' 
                    size="25px" 
                    m="2" 
                    onClick={(e) => setColor("#84D2C5")}>
                        <Circle
                            size='20px'
                            bg='#84D2C5'
                            color='white'></Circle>
                    </Button>
                    <Button 
                    variant='ghost' 
                    size="25px" 
                    m="2" 
                    onClick={(e) => setColor("#B5D5C5")}>
                        <Circle
                            size='20px'
                            bg='#B5D5C5'
                            color='white'></Circle>
                    </Button>
                    <Button 
                    variant='ghost' 
                    size="25px" 
                    m="2"
                    onClick={(e) => setColor("#EAC7C7")}>
                        <Circle
                            size='20px'
                            bg='#EAC7C7'
                            color='white'></Circle>
                    </Button>
                    <Button 
                    variant='ghost' 
                    size="25px" 
                    m="2" 
                    onClick={(e) => setColor("#C27664")}>
                        <Circle
                            size='20px'
                            bg='#C27664'
                            color='white'></Circle>
                    </Button>
                    <Button 
                    variant='ghost' 
                    size="25px" 
                    m="2" 
                    onClick={(e) => setColor("#B7B78A")}>
                        <Circle
                            size='20px'
                            bg='#B7B78A'
                            color='white'></Circle>
                    </Button>
                </Box>
                <Button m={5} colorScheme="red" onClick={handleSubmit}>Submit</Button>
            </Box>
        </div>
    )
}

export default SectionText