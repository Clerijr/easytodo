import './App.css';
import { useState } from 'react'

function App() {
  const [taskList, setTaskList] = useState([])

  function addTask(e) {
    e.preventDefault()
    const taskDescription = document.getElementById('inputNewTask').value
    const newTask = {
      'desc': taskDescription,
      'id': Math.random().toString(36).slice(2),
    }
    setTaskList([...taskList, newTask])
    return
  }

  function removeTask(e) {
    setTaskList(taskList.filter((task) => task.id !== e.target.id))
    return
  }

  return (
    <div className='App'>
      <h1>EasyTodo</h1>
      <form id='formNewTask'>
        <input id='inputNewTask' type='text' placeholder='What i need to do today...'></input>
        <input id='inputButton' type='submit' value='Create Task' onClick={addTask}></input>
      </form>
      <div className='taskList'>
        <ul>
          {taskList.length > 0 ? taskList.map((task, key) =>
            <li onClick={removeTask} id={task.id} className='task' key={task.id}>{task.desc}
            </li>
          ) : 'There are no tasks for today.'}
        </ul>
      </div>
    </div>
  );
}

export default App;
