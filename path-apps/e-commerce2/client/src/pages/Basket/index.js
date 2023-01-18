import {
    Alert, Button, Image, Box, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Textarea
} from '@chakra-ui/react'
import React from 'react'
import { useRef,useState } from 'react'
import { Link } from 'react-router-dom'
import { postOrder } from '../../api'
import { useBasket } from '../../contexts/BasketContext'

import Products from '../Products'

function Basket() {
    const [address, setAddress] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { items, removeFromBasket, nullBasket } = useBasket()
    const initialRef = React.useRef(null)

    const total = items.reduce((acc, obj) => acc + obj.price, 0)

    const handleSubmitForm = async() => {
        const itemIds = items.map((item) => item._id);
        
        const input = {
            address,
            items: JSON.stringify(itemIds)
        }

        const response = await postOrder(input);
        
        nullBasket()
        onClose();
    }


    return (
        <Box p="5">
            {
                items.length < 1 && (
                    <Alert status='warning'>You Have Not Any Items In Your Basket.</Alert>
                )
            }
            {
                items.length > 0 && <>
                    <ul>
                        {
                            items.map((item) => (
                                <li key={item._id}>
                                    <Link to={`Products/${item._id}`}>
                                        {item.title} - {item.price} TL
                                        <Image htmlWidth={200} src={item.photos[0]} alt="basket item" />
                                    </Link>
                                    <Button mt="2" size="sm" colorScheme="pink" onClick={() => removeFromBasket(item._id)}>
                                        Remove from basket
                                    </Button>
                                </li>
                            ))
                        }
                    </ul>
                    <Box mt="10">
                        <Text fontSize="22"> Total : {total} TL</Text>
                    </Box>

                    <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>Order</Button>

                    <Modal
                        initialFocusRef={initialRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Order</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Address</FormLabel>
                                    <Textarea ref={initialRef} placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                                </FormControl>


                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleSubmitForm}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            }

        </Box>
    )
}

export default Basket