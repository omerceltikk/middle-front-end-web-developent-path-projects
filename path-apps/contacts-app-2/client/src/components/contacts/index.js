import Form from './form'
import {useState,useEffect} from 'react'
import List from './list'

function Contacts() {
    const [contacts,setContacts] = useState([
        {fullname:"derya",
        phone_number:123123
    },
        {fullname:"aydın",
        phone_number:56985
    },
        {fullname:"reis",
        phone_number:7854785
    },
        {fullname:"tekerrür",
        phone_number:6548921
    },
    ])
    useEffect(() => {
        console.log(contacts);
    },[contacts])
  return (
    <div>
        contacts
        <List contacts={contacts} />
        <Form addContacts={setContacts} contacts={contacts} />
    </div>
  )
}

export default Contacts