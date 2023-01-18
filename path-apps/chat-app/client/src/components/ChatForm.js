import React, { useState } from 'react'
import styles from "../components/styles.module.css"
import { sendMessage } from '../socketApi'
import { UseChat } from '../context/ChatContext'

function ChatForm() {
    const [message, setMessage] =useState("")

    const { setMessages } = UseChat();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("")
        console.log(message);
        sendMessage(message)
        setMessages((prevState) => [...prevState, {message}])
    }

  return (
    <div >
        <form onSubmit={handleSubmit}>
            <input className={styles.textInput} value={message} onChange={(e) => setMessage(e.target.value)} />
        </form>
    </div>
  )
}

export default ChatForm