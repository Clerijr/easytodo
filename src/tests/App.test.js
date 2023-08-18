import { screen, render, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import { TodoContextProvider } from '../contexts/todoContext';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';



describe('App component', () => {
    it('should render with title', () => {
        render(<App />);
        expect(screen.getByText('EasyTodo')).toBeInTheDocument();
    })

    it('should add a new Task when button is pressed', () => {
        render(<App />);
        const inputTask = screen.getByPlaceholderText('What i need to do today...');
        const addTaskButton = screen.getByText('Create Task');
        fireEvent.change(inputTask, { target: { value: 'Test' } })
        fireEvent.click(addTaskButton)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('should remove a Task when button is pressed', () => {
        render(
            <TodoContextProvider>
                <AddTaskForm />
                <TaskList />
            </TodoContextProvider>
        );
        const inputTask = screen.getByPlaceholderText('What i need to do today...');
        const addTaskButton = screen.getByText('Create Task');
        fireEvent.change(inputTask, { target: { value: 'Remove Test' } })
        fireEvent.click(addTaskButton)
        let task = screen.getByText('Remove Test')
        fireEvent.click(task)
        expect(screen.getByText('Remove Test')).toBeNull()
    })

})