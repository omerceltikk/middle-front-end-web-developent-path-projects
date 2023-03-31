import React, { useState } from 'react'
import { updateContact } from '../../redux/contactsSlice';
import { useDispatch } from 'react-redux';
function EditForm({contact}) {
    const dispatch = useDispatch()
    const [name,setName] = useState(contact.name)
    const [number,setNumber] = useState(contact.phone_number)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name || !number) return false;
        dispatch(updateContact({
            id: contact.id,
            changes:{
                name,
                number
            }
        }))
    };

  return (
    <div>
          <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder='phone number' value={number} onChange={(e) => setNumber(e.target.value)} />
            <button type='submit'>Update</button>
        </form>
    </div>
    </div>
  )
}

export default EditForm