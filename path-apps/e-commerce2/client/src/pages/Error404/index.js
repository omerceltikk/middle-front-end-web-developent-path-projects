import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

function Error404() {
  return (
    <div>
        <Alert status='error'>
  <AlertIcon />
  <AlertTitle>Error404</AlertTitle>
  <AlertDescription>This Page Was Not Found!</AlertDescription>
</Alert>
    </div>
  )
}

export default Error404