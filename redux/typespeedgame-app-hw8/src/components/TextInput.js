import { Box, Button, Center, Input,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Loading from './Loading'
import {wordTimer,wordIndexStatus,wordsStatus } from '../redux/wordSlice'

function TextInput() {
    const dispatch = useDispatch()
    const [num, setNum] = useState()
    const [group, setGroup] = useState()
    const [start, setStart] = useState(false)
    
    const status = useSelector(state => state.data.compStatus)
    const words = useSelector(state => state.data.word)
    const wordIndex = useSelector(state => state.data.wordindex)

    const timer = useSelector(state => state.data.timer)
    const time = useSelector(state => state.data.time)
    useEffect(() => {
        if(start) {
            setTimeout(() => dispatch(wordTimer()),1000)
        }
    },[start, time, dispatch])

    
    useEffect(() => {
        if (wordIndex % 15 === 0) {
            setNum(wordIndex)
        }
        setGroup(words.slice(num, 15 + num))
    }, [words, num, wordIndex])

    const increIndex =(e)=> {
        if(e.target.value[e.target.value.length -1] === " "){
            dispatch(wordIndexStatus())
            e.target.value = "";
        }
    
    }
    const handleKey = (e) => {
        dispatch(wordsStatus(e.target.value))
        setStart(true)
    } 
  
    return (
        <div>
            
                <Box className='textInput'>
                    <Box className='wordsArea'>
                        {status === "idle" || status === "loading" ? <Loading/> 
                        : words[0].map((item, index) => (
                            <span key={index} className={`word ${item.status} ${item.nowWords ? "set": null}`}> {item.word}</span>
                        ))}
                    </Box>
                </Box>
                <br></br>
               <Box className='inputArea'>
                <Input 
                type="text"
                onKeyUpCapture={(e) => increIndex(e)}
                onChange={(e) => handleKey(e)} 
                disabled={timer < 1 && !start}
                dir="ltr"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                mb={12} 
                mr={5} 
                width="50%" 
                bg="#FFFBF5" 
                className="input"/>
                <Box mb={12} mr={2} borderRadius="10" color="#fff"  p={2} bg="#301E67">{time}</Box>
                <Button onClick={() => window.location.reload()} colorScheme="blue">↻</Button>
               </Box>
        </div>

    )
}

export default TextInput