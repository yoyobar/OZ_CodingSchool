import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { ALL, COMPLETED, NOT_COMPLETED } from '../store/todoSlice';
import { useEffect, useState } from 'react';
const TodoList = () => {
    const todo = useSelector((state) => state.todo);
    const [data, setData] = useState(todo.data);

    useEffect(() => {
        switch (todo.view) {
            case COMPLETED:
                setData(todo.data.filter((item) => item.completed === true));
                break;
            case ALL:
                setData(todo.data);
                break;
            case NOT_COMPLETED:
                setData(todo.data.filter((item) => item.completed === false));
                break;
        }
    }, [todo]);

    return (
        <div className=' w-full h-[500px] overflow-y-auto flex flex-col'>
            {data.map((item) => (
                <TodoItem key={item.id} {...item} />
            ))}
        </div>
    );
};

export default TodoList;
