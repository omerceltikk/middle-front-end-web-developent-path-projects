import { Grid, GridItem, Text,Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Start from './Start';
import { activeCards,handleScore } from '../redux/cardSlice';

function Cards() {
    const dispatch = useDispatch()
    const cards = useSelector(state => state.data.items);
    const cards2 = useSelector(state => state.data.items2);
    const start = useSelector(state => state.data.isStarted);
    const score = useSelector(state => state.data.score);
    
    const [selectCard, setSelectCard] = useState([])
    
    const handleClick = (item) => {
        if(selectCard.length == 2 || cards.status || score < 10)return false;
        setSelectCard([...selectCard,item])
        dispatch(activeCards({id: item.id, status: item.status}));
    }
    useEffect(() => {
        if(selectCard.length === 2){
            if(selectCard[0].item === selectCard[1].item){
                dispatch(handleScore(50))
                setSelectCard([])
            }else{
                dispatch(handleScore(-10))
                setTimeout(() => {
                    dispatch(activeCards({id: selectCard[0].id}))
                    dispatch(activeCards({id: selectCard[1].id}))
                    setSelectCard([])
                },1000)
            }
        }
        
    },[selectCard, dispatch])



    if (!start) {
        return <Start />
    }
    return (
        <div className='card-content'>
            <Grid margin={12} templateColumns='repeat(6, 1fr)' gap={4}>
                {
                    cards[0].map((item, id) => (
                        <GridItem className={`card ${item.status === true ? "active" : "" }`} key={id}
                            onClick={() => handleClick(item)}>
                            <div className="back">
                                <i><div className='text' as="b">?</div> </i>
                            </div>
                            <div className="front">
                                <i className="emoji">{item.item}</i>
                            </div>
                        </GridItem>
                    ))
                }
            </Grid>
        </div>
    )
}

export default Cards