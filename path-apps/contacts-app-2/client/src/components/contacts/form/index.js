import React from 'react'
import { useState} from 'react'

function Form({addContacts,contacts}) {
    const [form, setForm] = useState({ fullname: "", phone_number: "" })
    const onChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault()
        
        console.log(form)
        if(form.fullname === "" || form.phone_number === ""){
            return false
        }
        addContacts([...contacts,form])
        setForm({fullname: "", phone_number: "" })    
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <input value={form.fullname} name='fullname' placeholder='Full Name' onChange={onChangeInput} />
            </div>
            <div>
                <input value={form.phone_number} name='phone_number' placeholder='Phone Number' onChange={onChangeInput} />
            </div>
            <button>submit</button>
        </form>
    )
}

export default Form