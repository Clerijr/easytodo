import { createContext, useContext, useState, useEffect } from "react";

const BACKEND_URL = 'https://easytodo-backend.vercel.app'
//const BACKEND_URL ='http://localhost:3001'
//const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const TodoContext = createContext();

export function useTodoContext() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoContextProvider')
    }
    return context
}

async function createTask(task) {
    try {
        await fetch(`${BACKEND_URL}/todos`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        console.log('Task Created')
    } catch (e) {
        console.error(e.name, e.message)
    }
    return
}

async function deleteTask(id) {
    try {
        await fetch(`${BACKEND_URL}/todos/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log('Task Deleted')
    } catch (e) {
        console.log(e)
    }
    return
}


export function TodoContextProvider({ children }) {
    /* Fetching from backend */

    const [taskList, setTaskList] = useState([])

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

    useEffect(() => {
        fetchTasks()
    }, []);


    async function addTask(e) {
        e.preventDefault()
        const taskDescription = document.getElementById('inputNewTask').value
        const user = 'mock@user' // Todo
        const card = null // Todo
        const newTask = {
            'description': taskDescription,
            'user': user || null,
            'card': card || null
        }
        createTask(newTask).then(() => {
            fetchTasks()
        })
        document.getElementById('inputNewTask').value = ''
        return
    }

    async function removeTask(e) {
        e.preventDefault()
        deleteTask(e.target.attributes.id.value)
            .then(() => {
                fetchTasks()
            })
        return
    }

    return (
        <TodoContext.Provider value={{ taskList, addTask, removeTask }}>
            {children}
        </TodoContext.Provider>
    )

}
