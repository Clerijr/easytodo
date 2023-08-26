import { createContext, useContext, useState, useEffect } from "react";
/* 
const BACKEND_URL ='https://easytodo-backend.vercel.app'
const BACKEND_URL ='http://localhost:3001'
 */
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const TodoContext = createContext();

export function useTodoContext() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoContextProvider')
    }
    return context
}

/* async function tryFetch() {
    const response = await fetch(`${BACKEND_URL}/todos`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json()
    console.log(data)
    return
} */

/* async function createTask(task) {
    try {
        const response = await fetch(`${BACKEND_URL}/todos`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        console.log('chamo create')
        const data = await response.json()
        console.log('Task Created: ', data)
    } catch(e) {
        console.log(e)
    }
    return
} */


export function TodoContextProvider({ children }) {
    /* Fetching from backend */

    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        const fetchTasks = async function () {
            const data = await (
                await fetch(`${BACKEND_URL}/todos`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            ).json()
            setTaskList(data)
        }
        fetchTasks()
    }, [taskList]);




    async function addTask(e) {
        e.preventDefault()
        const taskDescription = document.getElementById('inputNewTask').value
        const user = null
        const card = null
        const newTask = {
            'description': taskDescription,
            'user': user || null,
            'card': card || null,
            'id': Math.random().toString(36).slice(2),
        }
        //createTask(newTask)
        setTaskList((oldTaskList) => {
            return [...oldTaskList, newTask]
        })
        document.getElementById('inputNewTask').value = ''
        return
    }

    async function removeTask(e) {
        e.preventDefault()
        setTaskList((oldTaskList) => {
            console.log(e.target)
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
