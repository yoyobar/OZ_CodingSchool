import { useMemo, useState } from 'react';
import logo from '../assets/Main.png';

function Clock() {
    const [time, setTime] = useState('00:00');
    useMemo(() => {
        setInterval(() => {
            const date = new Date();
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const timePeriod = hour >= 0 && hour < 12 ? 'AM' : 'PM';
            setTime(`${hour}:${minute} ${timePeriod}`);
        }, 1000);
    }, [time]);

    return <div className='ml-64 text-xs text-white font-mono'>{time}</div>;
}

function ToggleBtn() {
    const [check, setCheck] = useState(false);
    const checkHandler = () => {
        setCheck(!check);
    };

    return (
        <div className='ml-10 mt-4 font-mono flex gap-1'>
            <span className='text-white'>°C</span>
            <label className='inline-flex items-center cursor-pointer'>
                <input type='checkbox' onChange={checkHandler} value={check} className='sr-only peer' />
                <div
                    className='relative w-12 h-4 bg-gray-200 
                peer-focus:outline-none
                peer-focus:ring-blue-300 
                dark:peer-focus:ring-blue-800 rounded-full peer 
                dark:bg-gray-100
                peer-checked:after:translate-x-7
                rtl:peer-checked:after:-translate-x-full 
                after:absolute after:top-[2px] after:start-[3px] 
                after:bg-gray-700
                after:rounded-full after:h-3 after:w-3 after:transition-all 
                dark:border-gray-600 peer-checked:bg-green-500'
                ></div>
            </label>
            <span className='text-white'>°F</span>
        </div>
    );
}

function Search() {
    return (
        <div className='w-full flex justify-center mt-12'>
            <input
                className='focus:bg-slate-400 w-6/12 p-1 pl-8 rounded-lg outline-none bg-slate-200 placeholder:text-slate-600'
                placeholder='Search Location...'
            ></input>
        </div>
    );
}

export default function Header() {
    return (
        <>
            <img className='w-16 absolute' src={logo}></img>
            <header className='pt-9 ml-14 mr-14 wrapper_header font-mono flex gap-14'>
                <div className='text-white font-thin text-5xl flex-grow'>WeatherMe</div>
                <div className='text-white font-bold border-b cursor-pointer border-b-gray-500 h-7'>Today</div>
                <div className='text-white font-thin cursor-pointer'>Tomorrow</div>
                <div className='text-white font-thin cursor-pointer'>Monthly Forecast</div>
            </header>
            <Clock />
            <ToggleBtn />
            <Search />
        </>
    );
}
