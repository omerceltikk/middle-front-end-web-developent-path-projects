import React from 'react'
import {useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Text, Button } from '@chakra-ui/react';
import moment from 'moment';
import  ImageGallery  from 'react-image-gallery';
import { useBasket } from '../../contexts/BasketContext';

function ProductDetail() {
    const {product_id} = useParams();
    const {addToBasket, items} = useBasket();
    const {isLoading, error, data} = useQuery("product", () => fetch(`http://localhost:4000/product/${product_id}`)
    .then(res => res.json()))

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error.</div>
    }
    const findBasketItem = items.find((item) => item._id === product_id)
    const images = data.photos.map((url) => ({ original: url }) )
    
  return (
    <div>
            <Button colorScheme={findBasketItem ? "pink" : "green"} onClick={() => addToBasket(data, findBasketItem)}>
                
                {findBasketItem ? "Remove from basket" : "Add to basket"}
            </Button>
            <Text as="h2" fontSize="2xl">{data.title}</Text> 
            <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
            <p>{data.description}</p>
            
                <ImageGallery items={images} />
            
    </div>
  )
}

export default ProductDetail