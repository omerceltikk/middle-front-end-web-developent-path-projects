import React from 'react'
import { useQuery } from 'react-query'
import { fetchOrders } from '../../../api'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text } from '@chakra-ui/react'

function Orders() {
    const {isLoading, isError, data, error} = useQuery("admin:orders", fetchOrders)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error {error.message} </div>
    }
    
  return (
    <div>
       <Text fontSize="2xl" padding="10px">Orders</Text>
       <Table variant="simple">
        <Thead>
            <Tr>
                <Th>Users</Th>
                <Th>Address</Th>
                <Th isNumeric>Items</Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                data.map((item,id) => (
                    <Tr key={id}>
                        <Td>{item.user.email} </Td>
                        <Td>{item.adress} </Td>
                        <Td isNumeric>{item.items.length} </Td>
                    </Tr>
                ))
            }
        </Tbody>
        </Table> 
    </div>
  )
}

export default Orders