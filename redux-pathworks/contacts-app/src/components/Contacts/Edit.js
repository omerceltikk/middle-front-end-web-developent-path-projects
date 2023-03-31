import React from 'react'
import { useParams } from 'react-router-dom'
import EditForm from './EditForm'
import { useSelector } from 'react-redux'
import { contactSelectors } from '../../redux/contactsSlice'
function Edit() {
    const { id } = useParams()

    const contact = useSelector(contactSelectors.selectById(state,id))
    return (
        <div>
            <h1>Edit</h1>
            <EditForm contact={contact}/>
        </div>
    )
}

export default Edit