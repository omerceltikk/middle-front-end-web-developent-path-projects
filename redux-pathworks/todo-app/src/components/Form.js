import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import { addNewTodo } from '../redux/todos/todosSlice';

function Form() {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        if(!title) return;
        e.preventDefault();

        dispatch(addNewTodo({ title}))
        setTitle("");
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                 onChange={(e) => setTitle(e.target.value)} 
                 value={title}
                 className="new-todo" 
                 placeholder="What needs to be done?" 
                 autoFocus />
            </form>
        </div>
    )
}

export default Form