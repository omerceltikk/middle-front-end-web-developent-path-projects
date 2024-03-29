import {  createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children}) => { 
    const [messages, setMessages] = useState([
        {message :"selam"},
        {message :"nehaber"}
    ])
    const values = {
        messages,
        setMessages,
    };
    return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

export const UseChat = () => useContext(ChatContext);
