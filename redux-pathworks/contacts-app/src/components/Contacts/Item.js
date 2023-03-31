import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contactsSlice'
import { Link } from 'react-router-dom'

function Item({ item }) {
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(deleteContact(id));
    }

  }

  return (
    <div>
      <span>{item.name} </span>
      <span>{item.phone_number} </span>
      <div className='edit'>
        <span>
          <Link to={`/edit/${item.id}`}>Edit</Link>
           </span>
        <span className='deleteBtn' onClick={(e) => handleDelete(item.id)}>x</span>
      </div>
    </div>
  )
}

export default Item