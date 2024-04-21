import { useState } from 'react';

export default function Footer({ todoCreate }) {
    const [input, setInput] = useState('');

    const onChangeEvent = (e) => {
        setInput(e.target.value);
    };

    const onEnterEvent = (e) => {
        if (e.key === 'Enter') {
            onClickEvent();
        }
    };

    const onClickEvent = () => {
        if (input.trim() === '') return alert('내용을 넣으세요');

        const day = new Date().getDate();
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        const date = `${day}일 ${hour}시 ${minute}분`;
        todoCreate(date, input);
        setInput('');
    };

    return (
        <div className=' bg-slate-500 w-full h-12 flex justify-center items-center'>
            <input
                onChange={onChangeEvent}
                onKeyDown={onEnterEvent}
                value={input}
                className='focus:bg-slate-300 bg-slate-100 rounded-sm ml-4 mr-4 pl-4 outline-none w-full'
            ></input>
            <button
                onClick={onClickEvent}
                className='bg-indigo-500 mr-4  hover:bg-indigo-700 w-12 h-6 text-white font-semibold rounded-md'
            >
                추가
            </button>
        </div>
    );
}
