import { useTodoContext } from '../contexts/todoContext'

function Task({ taskId, taskDesc, onClick }) {
    const { removeTask } = useTodoContext()

    return (
        <li id={taskId} onClick={removeTask} className='task' >{taskDesc}
        </li>
    )
}

export default Task