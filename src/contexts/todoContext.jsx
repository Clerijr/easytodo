import { createContext, useContext, useState, useEffect } from "react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const LOCALHOST = process.env.REACT_APP_LOCALHOST

export const TodoContext = createContext();

export function useTodoContext() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoContextProvider')
    }
    return context
}

async function tryFetch() {
    const response = await fetch(`${LOCALHOST}/todos`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json()
    console.log(data)
    return
}

async function createTask(task) {
    try {
        const response = await fetch(`${LOCALHOST}/todos`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await response.json()
        console.log('Task Created: ', data)
    } catch(e) {
        console.log(e)
    }
    return
}
export function TodoContextProvider({ children }) {
    /* Fetching from backend */

    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskListKey')) || [])

    useEffect(() => {
        localStorage.setItem('taskListKey', JSON.stringify(taskList));
        tryFetch()
    }, [taskList]);

    function addTask(e) {
        e.preventDefault()
        const taskDescription = document.getElementById('inputNewTask').value
        const user = null
        const newTask = {
            'desc': taskDescription,
            'user': user || null
            //'id': Math.random().toString(36).slice(2),
        }
        createTask(newTask)
        setTaskList((oldTaskList) => {
            return [...oldTaskList, newTask]
        })
        document.getElementById('inputNewTask').value = ''
        return
    }

    async function removeTask(e) {
        e.preventDefault()
        setTaskList((oldTaskList) => {
            return oldTaskList.filter((task) => task.id !== e.target.attributes.id.value)
        })
        return
    }

    return (
        <TodoContext.Provider value={{ taskList, addTask, removeTask }}>
            {children}
        </TodoContext.Provider>
    )

}
