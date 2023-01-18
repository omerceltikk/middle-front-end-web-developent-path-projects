import {useEffect} from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import {UseChat} from "../context/ChatContext"

import { init, subscribeChat, subscribeInitialMessages } from '../socketApi'

function Container() {
  const {setMessages} =UseChat()
useEffect(() => {
  init();
  subscribeInitialMessages((messages) => {
    setMessages(messages);
  })
  subscribeChat((message) => {
    setMessages(prevState => [...prevState, {message, fromMe:true} ])
  });
},[])

  return (
    <div className='App'>
        <ChatList/>
        <ChatForm/>
    </div>
  )
}

export default Container