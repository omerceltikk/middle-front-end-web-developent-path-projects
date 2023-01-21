import { Center,Heading } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import StickyBox from "react-sticky-box";
function MoneyIndex() {
    const budget = useSelector(state => state.element.budget)
  return (
    <div>
      <StickyBox >
        <Center width="100%" bgGradient='linear(to-l, #86C8BC, #91D8E4)'>
            <Heading color="white" p={5}>
                {budget.toLocaleString()} $
            </Heading>
        </Center>
        </StickyBox>
    </div>
  )
}

export default MoneyIndex