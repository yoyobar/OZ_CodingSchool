import { useState } from 'react';

export default function Search() {
    const mockData = ['seoul', 'busan', 'gwangju'];
    const [show, setShow] = useState(true);
    const [input, setInput] = useState('');

    const inputChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
        console.log(input);
    };
    const searchFocus = () => {
        setShow(true);
    };
    const searchBlur = () => {
        setShow(false);
    };
    const citySelect = (e) => {
        console.log(e.target.value);
    };

    return (
        <div className='relative w-full flex-col justify-center mt-12'>
            <input
                onFocus={searchFocus}
                onBlur={searchBlur}
                onChange={inputChange}
                className='focus:bg-slate-400 ml-4 mr-4 w-full p-1 pl-8 rounded-lg outline-none bg-slate-200 placeholder:text-slate-600'
                placeholder='Search Location...'
            ></input>
            {show && (
                <div className='absolute flex flex-col ml-4 mr-4 top-10 w-full z-10'>
                    {mockData.map((item, index) => (
                        <button
                            onClick={citySelect}
                            value={item}
                            className='w-36 text-center rounded-sm hover:bg-slate-600 hover:text-white font-mono text-slate-600 bg-slate-400 mb-1 border-b border-slate-700'
                            key={index}
                        >
                            {item}
                        </button>
                    ))}
                    <button className='absolute font-mono top-0 left-40 text-white bg-green-600 hover: p-1 rounded-lg'>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
