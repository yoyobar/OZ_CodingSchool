import { useEffect, useState } from 'react';
import Form from './components/Form';
import TodoList from './components/TodoList';
import Option from './components/Option';
import { useDispatch } from 'react-redux';
import { loadTodo } from './store/todoSlice';

const App = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = JSON.parse(localStorage.getItem('todo'));
        if (loadData !== null) {
            dispatch(loadTodo(loadData));
        }
    }, [dispatch]);

    return (
        <>
            <div className='w-3/6 h-3/6 m-auto mt-20 shadow-lg border select-none'>
                <Form text={text} setText={setText} />
                <TodoList />
                <Option />
            </div>
        </>
    );
};

export default App;
