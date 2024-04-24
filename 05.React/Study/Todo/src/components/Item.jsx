import { useState } from 'react';

export default function Item({ content, id, createDate, checked, todoDelete, todoUpdate }) {
    const onClickEvent = () => {
        todoDelete(id);
    };
    const onCheckEvent = () => {
        todoUpdate(id);
    };

    return (
        <div
            className={checked ? ' text-slate-300 flex gap-8 w-full border-b pb-2' : 'flex gap-8 w-full border-b pb-2'}
        >
            <div>{createDate}</div>
            <div className='flex-grow'>{content}</div>
            <button onClick={onClickEvent} className='bg-red-400 text-white w-7 rounded-md hover:bg-red-600'>
                X
            </button>
            <input onChange={onCheckEvent} checked={checked} className='mr-4' type='checkbox'></input>
        </div>
    );
}
