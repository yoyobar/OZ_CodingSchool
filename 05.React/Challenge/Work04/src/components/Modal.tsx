import { useEffect, useRef, useState } from 'react';
import useTodo, { FormType } from '../store';

interface ModalProps {
    modalId: string;
    modalExit: () => void;
}

export default function Modal({ modalId, modalExit }: ModalProps) {
    const { todo, updateTodo } = useTodo();
    const [todoContent] = todo.filter((item) => Number(item.id) === Number(modalId));
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInput(todoContent.content);

        inputRef.current!.focus();
    }, [todoContent]);

    const keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') modalConfirmHandler();
    };

    const modalConfirmHandler = () => {
        if (input.trim() === '') return modalExit();

        const form: FormType = {
            ...todoContent,
            content: input,
        };

        updateTodo(form);
        modalExit();
    };

    const modalExitHandler = () => {
        modalExit();
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (input.length === 16) {
            alert('16자 이상의 메세지는 사용 할 수 없습니다.');
            return setInput(input.substring(0, 15));
        }
        setInput(e.target.value);
    };

    return (
        <div className='absolute rounded-md flex flex-col justify-between p-4 top-10 left-5 opacity-95 bg-slate-800 w-[230px] h-[200px] font-mono text-white'>
            <div className='text-2xl'>내용 수정</div>
            <input
                ref={inputRef}
                onKeyUp={keyUpHandler}
                onChange={inputHandler}
                value={input}
                placeholder='task...'
                className='text-black w-full p-2 rounded-md '
            ></input>

            <div className='flex gap-4'>
                <button onClick={modalConfirmHandler} className='bg-indigo-400 hover:bg-indigo-500 transition p-2 rounded-md'>
                    수정
                </button>
                <button onClick={modalExitHandler} className='bg-red-400 hover:bg-red-500 transition p-2 rounded-md'>
                    닫기
                </button>
            </div>
        </div>
    );
}
