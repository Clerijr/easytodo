import './App.css';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { TodoContextProvider } from './contexts/todoContext';

function App() {

  return (
    <div className='App'>
      <h1 id='title'>EasyTodo</h1>
      <TodoContextProvider>
        <AddTaskForm />
        <TaskList />
      </TodoContextProvider>
    </div>
  );
}

export default App;
