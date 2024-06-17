import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
};

const style = 'w-[50px] h-[20px] bg-slate-500 flex items-center rounded-xl p-1 cursor-pointer';

const Modal = ({ createTodo, modalOn }) => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [form, setForm] = useState({
        title: '',
        completed: false,
    });
    const ref = useRef(null);

    useEffect(() => {
        ref.current.focus();
    }, []);

    const createTodoHandler = (e) => {
        if (form.title.trim() === '') return alert('빈 내용은 게시할 수 없습니다.');
        e.preventDefault();
        createTodo(form);
        modalOn();
    };

    const formHandler = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === 'checkbox' ? isCompleted : value,
        }));
    };

    return (
        <motion.div
            animate={{ translateY: [5, -5, 0] }}
            className='absolute z-50 top-[20%] w-[300px] h-fit bg-indigo-950 rounded-md text-white p-2 select-none'
        >
            <form className='flex flex-col gap-2' onSubmit={createTodoHandler}>
                <div>제목</div>
                <input
                    ref={ref}
                    className='text-black placeholder:text-gray rounded-md p-2'
                    name='title'
                    placeholder='Title...'
                    value={form.title}
                    onChange={formHandler}
                />

                <div>체크 여부</div>
                <div
                    name='checkbox'
                    className={isCompleted ? `${style} justify-end bg-indigo-500` : `${style} justify-start bg-slate-500`}
                    onClick={() => {
                        setIsCompleted((prev) => !prev);
                        setForm((prevForm) => ({
                            ...prevForm,
                            completed: !isCompleted,
                        }));
                    }}
                >
                    <motion.div className='w-[12px] h-[12px] bg-white opacity-90 rounded-full' layout transition={spring} />
                </div>

                <button onClick={createTodoHandler} type='submit'>
                    생성
                </button>
                <button type='button' onClick={modalOn} className='bg-red-400 hover:bg-red-600'>
                    취소
                </button>
            </form>
        </motion.div>
    );
};

export default Modal;
