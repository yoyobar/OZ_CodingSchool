import { useEffect, useState } from 'react';
import { useModal } from '../store';

let timerInterval = null;
let timer = null;

const Message = () => {
    const { visible, text, modalClose } = useModal();
    const [indicator, setIndicator] = useState(3000);

    useEffect(() => {
        if (visible) {
            timerInterval = setInterval(() => {
                setIndicator((prev) => prev - 10);
            }, 10);

            timer = setTimeout(() => {
                setIndicator(3000);
                modalClose();
            }, 3000);
        }
        return () => {
            clearInterval(timerInterval);
            clearTimeout(timer);
        };
    }, [visible, modalClose]);

    if (!visible) return;

    return (
        <>
            <div className='fixed flex flex-col gap-2 bottom-10 right-10 min-w-[240px] p-2 bg-indigo-700 text-white rounded-md z-50'>
                <div>{text}</div>
                <div className='h-[4px] bg-green-600 rounded-md' style={{ width: `${(indicator / 3000) * 100}%` }}></div>
            </div>
        </>
    );
};

export default Message;
