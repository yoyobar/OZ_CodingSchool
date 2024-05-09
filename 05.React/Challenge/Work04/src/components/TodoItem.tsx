import useTodo, { FormType } from '../store';
import React from 'react';

interface TodoItemProps extends FormType {
    modalActive: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodoItem = ({ id, content, isChecked, modalActive }: TodoItemProps) => {
    const date = new Date(id);
    const { deleteTodo, checkTodo } = useTodo();

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const currentId = Number(e.currentTarget.value);

        deleteTodo(currentId);
    };

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentId = Number(e.currentTarget.id);
        checkTodo(currentId);
    };

    return (
        <>
            <label
                htmlFor={String(id)}
                className={
                    isChecked
                        ? 'flex mb-4 items-center gap-4 bg-slate-400 p-2 rounded-md'
                        : 'flex mb-4 items-center gap-4 bg-slate-200 hover:bg-slate-400 p-2 rounded-md'
                }
            >
                <input onChange={checkHandler} value={String(isChecked)} id={String(id)} className='hidden' type='checkbox' />
                <div className={isChecked ? 'text-sm text-slate-600' : 'text-sm'}>{date.toLocaleDateString()}</div>
                <div className={isChecked ? 'text-xl flex-grow text-slate-600' : 'text-xl flex-grow'}>{content}</div>
                <button value={id} onClick={modalActive} className='bg-indigo-400 text-white p-2 rounded-md hover:bg-indigo-500 transition'>
                    수정
                </button>
                <button value={id} onClick={deleteHandler} className='bg-red-400 text-white p-2 rounded-md hover:bg-red-500 transition'>
                    삭제
                </button>
            </label>
        </>
    );
};

export default TodoItem;
