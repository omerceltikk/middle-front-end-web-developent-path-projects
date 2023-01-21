import React from 'react'
import { Box, Center, Heading, Image } from '@chakra-ui/react'
import MoneyIndex from './MoneyIndex'

function Header() {
    
    return (
        <div>
            <Center bg="#F2DEBA">
            <Image
                borderRadius='full'
                boxSize='250px'
                src='https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg'
                alt='Dan Abramov'
                m={10}
                display="block"
            />
            
            </Center>
            <Center bg="#F2DEBA">
            <Heading mb={12}>Spend Bill Gates Money</Heading>
            </Center>
            <MoneyIndex/>
            
        </div>
    )
}

export default Header