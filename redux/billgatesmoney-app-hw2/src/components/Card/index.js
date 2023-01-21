import { Grid, GridItem, Heading, Image, Box, ButtonGroup, Button, Input, Card, Center, Text } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { cardProduct,buyProducts,sellProducts } from '../../redux/card/CardSlice';
function ProductCard() {
const dispatch = useDispatch(buyProducts)
const [disabled, setDisabled] = useState(false)
const [amount ,setAmount] = useState(0)

const product = useSelector(cardProduct);
const elementBudget = useSelector((state) => state.element.budget)


    return (
        <div>
            <Grid bg="#F2DEBA" templateColumns='repeat(3, 1fr)' gap={3}>
                {
                    product.map((item) => (
                        <Card key={item.id}>
                            <GridItem >
                                <Center>
                                    <Image m={10} src={item.image} />
                                </Center>
                                <Text as='b' fontSize='2xl' >{item.productName}</Text>
                                <br></br>
                                <Text as='i' m={10} fontSize='2xl'>{item.productPrice} $</Text>
                                <br></br>
                                <ButtonGroup
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    m={5}>
                                        
                                    <Button 
                                    isDisabled={amount*item.productPrice <= elementBudget ? false : true} 
                                    size='lg' 
                                    mx={5} 
                                    onClick={() => dispatch(sellProducts({count: amount,id: item.id}))} 
                                    colorScheme='red'>Sell</Button>
                                    <Input onChange={(e) => setAmount(e.target.value)} size='lg' mx={5} type="number" />
                                    <Button 
                                    isDisabled={amount*item.productPrice <= elementBudget ? false : true}
                                    onClick={() => dispatch(buyProducts({count: amount,id: item.id}))} 
                                    size='lg' 
                                    colorScheme='green'>Buy</Button>
                                </ButtonGroup>
                            </GridItem>
                        </Card>

                    ))
                }
            </Grid>
        </div>
    )
}

export default ProductCard