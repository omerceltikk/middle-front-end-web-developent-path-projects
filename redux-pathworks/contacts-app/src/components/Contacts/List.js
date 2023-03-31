import React from 'react'
import { contactSelectors } from '../../redux/contactsSlice'
import { removeAllContacts } from '../../redux/contactsSlice'
import { useDispatch, useSelector } from 'react-redux'
function List() {
    const dispatch = useDispatch()
const handleDeleteAll = () => {
    dispatch(removeAllContacts())
}
  const contacts = useSelector(contactSelectors.selectEntities)
    return (
    <div>
        <div className='deleteAllBtn' onClick={handleDeleteAll}>Delete All</div>
        {
            contacts.map((contact) => (<Item  key={contact.id} item={contact} />))
        }
    </div>
  )
}

export default List