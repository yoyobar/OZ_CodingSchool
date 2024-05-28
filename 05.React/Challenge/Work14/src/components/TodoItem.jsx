import { useDispatch } from 'react-redux';
import { checkTodo, deleteTodo, editTodo } from '../store/todoSlice';

const TodoItem = ({ id, text, completed }) => {
    const dispatch = useDispatch();

    const checkHandler = () => {
        dispatch(checkTodo(id));
    };
    const editHandler = () => {
        const newText = prompt('수정할 내용을 입력하세요.');
        if (newText === null || newText.trim() === '') return;
        dispatch(
            editTodo({
                id: id,
                text: newText,
            })
        );
    };
    const deleteHandler = () => {
        dispatch(deleteTodo(id));
    };

    return (
        <div className='relative flex gap-4 border-b p-2 justify-center items-center'>
            <input value={completed} className='invisible' id={id} type='checkbox' />
            <div className='absolute border rounded-full left-2 w-[20px] h-[20px]'></div>
            <div onClick={checkHandler} className='cursor-pointer  absolute left-[0.6rem] w-[20px] h-[20px]'>
                {completed ? (
                    <>
                        <div className='transition absolute left-0 top-[0.6rem] w-[10px] border-2 border-collapse border-indigo-500 bg-indigo-500 rotate-[50deg] rounded-md z-10'></div>
                        <div className='transition absolute left-[0.245rem] top-[0.52rem] w-[14px] border-2 border-collapse border-indigo-500 bg-indigo-500 rounded-md rotate-[-43deg] z-10'></div>
                    </>
                ) : (
                    <>
                        <div className='transition absolute left-0 top-[0.6rem] w-[9px] z-10 '></div>
                        <div className='transition absolute left-[0.29rem] top-[0.6rem] w-[14px] z-10'></div>
                    </>
                )}
            </div>
            <label onClick={checkHandler} htmlFor={id} className='flex-grow'>
                {text}
            </label>
            <button onClick={editHandler} className='rounded-md p-1 bg-slate-400 hover:bg-slate-600 transition text-white'>
                Edit
            </button>
            <button onClick={deleteHandler} className='scale-x-125 text-red-500 hover:text-red-900'>
                X
            </button>
        </div>
    );
};

export default TodoItem;
