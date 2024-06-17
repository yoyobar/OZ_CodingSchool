import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import ButtonContainer from './ButtonContainer';
import './TodoContainer.css';
import { SERVER_URL } from '../constant/const';

function TodoContainer() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { data } = await axios.get(SERVER_URL);
                setTodos([...data]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTodos();
    }, []);

    const createTodo = async (form) => {
        try {
            const data = await axios.post(SERVER_URL, form);
            if (data.status === 200) {
                const { data } = await axios.get(SERVER_URL);
                setTodos([...data]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='todo-app-container overflow-x-hidden'>
            <ButtonContainer createTodo={createTodo} />
            <div className='todo-list'>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        setTodos={setTodos}
                        editingTodo={editingTodo}
                        setEditingTodo={setEditingTodo}
                        newTitle={newTitle}
                        setNewTitle={setNewTitle}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodoContainer;
