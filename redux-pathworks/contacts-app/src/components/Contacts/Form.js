import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addContact } from '../../redux/contactsSlice'
function Form() {
    const dispatch = useDispatch()
    const [name,setName] = useState("")
    const [number,setNumber] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name) return false;
        dispatch(addContact({id:nanoid() ,name, phone_number: number}))
        setName("")
        setNumber("")
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder='phone number' value={number} onChange={(e) => setNumber(e.target.value)} />
            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default Form