import React from 'react'
import { useSelector } from 'react-redux'

function Error() {
    const errorMessage = useSelector(state => state.error.message)
  return (
    <div>Error:{errorMessage} </div>
  )
}

export default Error