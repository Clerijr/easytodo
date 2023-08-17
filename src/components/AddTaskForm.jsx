import React from 'react'
import { useTodoContext } from '../contexts/todoContext'

function AddTaskForm() {
    const { addTask } = useTodoContext()

    return (
        <form id='formNewTask'>
            <input id='inputNewTask' type='text' placeholder='What i need to do today...'></input>
            <input id='inputButton' type='submit' value='Create Task' onClick={addTask}></input>
        </form>
    )
}

export default AddTaskForm