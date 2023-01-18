import React from 'react'
import styles from "../components/styles.module.css"
import { UseChat } from '../context/ChatContext';
import ChatItem from './ChatItem';

function ChatList() {
    const { messages } = UseChat()

    return (
        <div className={styles.chatlist}>
            <div>
                {
                    messages.map((item, key) => (<ChatItem key={key} item={item} ></ChatItem>))
                }
            </div>
        </div>
    )
}

export default ChatList