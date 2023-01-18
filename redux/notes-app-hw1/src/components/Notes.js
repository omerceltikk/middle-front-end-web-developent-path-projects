import React from 'react'
import { Card, CardBody, Grid, Text, GridItem, Button, Icon } from '@chakra-ui/react'
import { useSelector,useDispatch } from 'react-redux'
import { selectNotes,destroy } from '../redux/notes/notesSlice'
import { SmallCloseIcon } from '@chakra-ui/icons'
function Notes() {
    const notes = useSelector(selectNotes);
    const dispatch = useDispatch();
    

    return (
        <div>
            <Grid templateColumns='repeat(4, 1fr)' gap={1}>
                {
                    notes.map((element) => (
                    <GridItem key={element.id} w="sm" mx={10} my={5}>
                    <Card h="200px" bg={element.color}>
                        <CardBody>
                            <Text>{element.title}</Text>
                        </CardBody>
                    <Button onClick={(item) => dispatch(destroy(element.id))}>
                    <Icon float="right" as={SmallCloseIcon} />
                    </Button>
                    </Card>
                </GridItem>
                ))
            }
            </Grid>
        </div>
    )
}

export default Notes