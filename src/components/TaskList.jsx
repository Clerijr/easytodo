import React from 'react'
import { useTodoContext } from '../contexts/todoContext'
import Task from './Task'

function TaskList() {
    const { taskList } = useTodoContext()

    return (
        <div className='taskList'>
            <ul>
                {taskList.length > 0 ? taskList.map((task, key) =>
                    <Task key={key} taskId={task.id} taskDesc={task.desc} />
                ) : 'There are no tasks for today.'}
            </ul>
        </div>
    )
}

export default TaskList