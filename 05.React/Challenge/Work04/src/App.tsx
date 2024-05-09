import { useCallback, useState } from 'react';
import TodoItem from './components/TodoItem';
import useTodo, { FormType } from './store';
import Modal from './components/Modal';

function App() {
    const { todo, createTodo } = useTodo();
    const [input, setInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalId, setModalId] = useState('');

    const inputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 16) {
            setInput(inputValue);
        }
    }, []);

    const addBtnHandler = () => {
        if (input.trim() === '') return;

        const form: FormType = {
            id: new Date().getTime(),
            content: input,
            isChecked: false,
        };
        createTodo(form);
        setInput('');
    };

    const modalActive = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModalId(e.currentTarget.value);
        setModalVisible(true);
    };

    const modalExit = () => {
        setModalVisible(false);
    };
    return (
        <div className='flex select-none flex-col justify-center items-center h-screen'>
            <div className='bg-slate-600 p-6 rounded-sm'>
                <div className='text-3xl p-2 w-[600px] bg-slate-400 font-mono text-white flex justify-center rounded-lg'>TODO LIST</div>
                <div className='gap-[20px] flex'>
                    <input
                        value={input}
                        onChange={inputHandler}
                        placeholder='New Todo...'
                        className='mt-2 rounded-md p-2 w-[500px] bg-slate-100'
                    ></input>
                    <button onClick={addBtnHandler} className='w-[80px] p-2 mt-2 rounded-md text-white bg-green-500 hover:bg-green-600'>
                        추가
                    </button>
                </div>
            </div>
            <div className='relative'>
                <div className='h-[600px] w-[500px] overflow-y-scroll mt-4 bg-slate-100 p-2 border rounded-md'>
                    {modalVisible && <Modal modalId={modalId} modalExit={modalExit} />}
                    {todo.map((item) => (
                        <TodoItem modalExit={modalExit} modalActive={modalActive} key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
