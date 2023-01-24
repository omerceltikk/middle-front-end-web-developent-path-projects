import {useEffect, useState} from 'react'
import { Text, Select, Button, Heading } from '@chakra-ui/react'
import { useSelector,useDispatch } from 'react-redux'
import { wordsSort } from '../redux/wordSlice'

function Header() {
    const [lang,setLang] = useState("turkish")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wordsSort(lang))
    },[dispatch,lang])
    return (

        <div>
            <Heading mt={5} as="h2">Typing Speed App</Heading>
            <br></br>
            <div className='heading'>
                <div className='header'>
                    <Button colorScheme="blue" m={2}>Giriş</Button>
                    <Select onChange={(e) => setLang(e.target.value)} bg='#EEE'
                         m={2} w="25">
                        <option value="turkish">Turkish</option>
                        <option value="english">English</option>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default Header