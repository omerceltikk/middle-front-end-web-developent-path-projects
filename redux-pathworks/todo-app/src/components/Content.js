import React from 'react'
import ToDoList from './ToDoList'
import ContentFooter from './ContentFooter'

function Content() {
    return (
        <>
        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">
                Mark all as complete
            </label>
            <ToDoList/>
        </section>
        <ContentFooter/>
        </>
    )
}

export default Content