import axios from 'axios';
import './TodoItem.css';
import { SERVER_URL } from '../constant/const';
import { motion } from 'framer-motion';

const TodoItem = ({ todo, setTodos, editingTodo, setEditingTodo, newTitle, setNewTitle }) => {
    const updateTodo = async (id, completed) => {
        try {
            const data = await axios.put(`${SERVER_URL}/${id}`, { completed, title: todo.title });
            if (data.status === 200) {
                const { data } = await axios.get(SERVER_URL);
                setTodos([...data]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveEdit = async (id) => {
        try {
            const data = await axios.put(`${SERVER_URL}/${id}`, { title: newTitle });
            if (data.status === 200) {
                const { data } = await axios.get(SERVER_URL);
                setTodos([...data]);
            }
            setEditingTodo(null);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const data = await axios.delete(`${SERVER_URL}/${id}`);
            if (data.status === 200) {
                const { data } = await axios.get(SERVER_URL);
                setTodos([...data]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const startEditing = (todo) => {
        setEditingTodo(todo.id);
        setNewTitle(todo.title || '');
    };

    return (
        <motion.div
            animate={{ opacity: [0.5, 1], translateX: ['50%', 0] }}
            transition={{ duration: 0.4 }}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            key={todo.id}
        >
            <input type='checkbox' checked={todo.completed ? true : false} onChange={() => updateTodo(todo.id, !todo.completed)} />
            {editingTodo === todo.id ? (
                <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            ) : (
                <span>{todo.title ? todo.title : `할 일 #${todo.id}`}</span>
            )}
            {editingTodo === todo.id ? (
                <button className='save-btn' onClick={() => saveEdit(todo.id)}>
                    저장
                </button>
            ) : (
                <button className='edit-btn' onClick={() => startEditing(todo)}>
                    수정
                </button>
            )}
            <button type='button' className='delete-btn' onClick={() => deleteTodo(todo.id)}>
                삭제
            </button>
        </motion.div>
    );
};

export default TodoItem;
