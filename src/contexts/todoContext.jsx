import { createContext, useContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export function useTodoContext() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoContextProvider')
    }
    return context
}

export function TodoContextProvider({ children }) {
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskListKey')) || [])

    useEffect(() => {
        localStorage.setItem('taskListKey', JSON.stringify(taskList));
    }, [taskList]);

    function addTask(e) {
        e.preventDefault()
        const taskDescription = document.getElementById('inputNewTask').value
        const newTask = {
            'desc': taskDescription,
            'id': Math.random().toString(36).slice(2),
        }
        setTaskList((oldTaskList) => {
            return [...oldTaskList, newTask]
        })
        document.getElementById('inputNewTask').value = ''
        return
    }

    function removeTask(e) {
        e.preventDefault()
        console.log(taskList)
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
