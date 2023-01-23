import React from 'react'
import { BarLoader } from 'react-spinners'


function Loading() {
  return (
    <div className='loading'>
        <BarLoader color="#7e93ff" />
    </div>
  )
}

export default Loading