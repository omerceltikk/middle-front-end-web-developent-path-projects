import { Form } from 'formik'
import React from 'react'
import List from './List'
import { useSelector } from 'react-redux'
import contactSelectors from '../../redux/contactsSlice'
function Contacts() {
  const total = useSelector(contactSelectors.selectTotal)
  return (
    
    <div>
      <h4>{total}</h4>
        <Form/>
        <List/>
    </div>
  )
}

export default Contacts