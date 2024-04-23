import useTempData from '../hooks/useTempData';
import template from '../assets/template.png';
import { useContext } from 'react';
import { WeatherStateContext } from '../App';

export default function Card({ weather, index }) {
    const { slide } = useContext(WeatherStateContext);
    const tempData = useTempData(weather[slide], index);

    return (
        <div className='relative font-mono'>
            <div className='w-24 h-24 bg-slate-200 rounded-xl flex flex-col items-center'>
                <div>{tempData ? tempData : '...'}</div>
                <img
                    className='rounded-sm relative z-10 w-10'
                    src={
                        tempData
                            ? `https://openweathermap.org/img/wn/${weather[slide][index].weatherIcon}@2x.png`
                            : template
                    }
                ></img>
                <div className='text-slate-300 relative z-10'>{tempData ? weather[slide][index].time : '...'}</div>
            </div>
            <div className='absolute w-24 h-10 bg-gradient-to-t to-gray-600 from-gray-800 -bottom-1 rounded-xl'></div>
        </div>
    );
}
