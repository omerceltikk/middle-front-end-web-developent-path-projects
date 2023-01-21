import { Grid, Heading, Text, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Center } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'


function Receipt() {
  const receipt = useSelector(state => state.element.budget)
  const calculate = useSelector(state => state.element.items)

  const filterItem = calculate.filter((item) => item.count > 0)
  console.log(filterItem);
  if (filterItem.lenght == 0) {
    return null;
  }
  return (
    <div>
      <Heading color="green" mb={10}>{receipt.toLocaleString()} $</Heading>
      <Center>
        <br></br>
        <TableContainer>
          <Table variant='striped' colorScheme='gray' size="lg">
            <TableCaption>RESULT</TableCaption>
                  <Thead>
                    <Tr>
                      <Th >Product Name</Th>
                      <Th>Count</Th>
                      <Th isNumeric>Total Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
            {
              filterItem.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.productName}</Td>
                      <Td>{item.count} </Td>
                      <Td >{(Number(item.count) * Number(item.productPrice)).toLocaleString() } $</Td>
                    </Tr>
              ))
            }
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </div>
  )
}

export default Receipt