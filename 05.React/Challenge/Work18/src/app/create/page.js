'use client';

import axios from 'axios';
import { useState } from 'react';
import { urls } from '/api/urls';
import { useRouter } from 'next/navigation';
const Create = () => {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [textarea, setTextarea] = useState('');
    const formHandler = async (e) => {
        e.preventDefault();

        const formData = {
            title: input,
            body: textarea,
        };
        axios.post(urls.topics, formData).then((res) => {
            router.push(`/read`);
            router.refresh();
        });
    };
    return (
        <>
            <form className='flex flex-col justify-start gap-2' onSubmit={formHandler}>
                <p>
                    <input
                        required
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className='ml-4 mt-4 w-3/6 bg-slate-200 p-2 rounded-md'
                        type='text'
                        name='title'
                        placeholder='title...'
                    ></input>
                </p>
                <p>
                    <textarea
                        required
                        onChange={(e) => setTextarea(e.target.value)}
                        value={textarea}
                        className='w-3/6 h-[100px] bg-slate-200 p-2 rounded-md ml-4'
                        name='body'
                        placeholder='body...'
                    ></textarea>
                </p>
                <button
                    value='create'
                    className='bg-indigo-400 hover:bg-indigo-600 transition text-white rounded-md w-3/6 ml-4'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default Create;
