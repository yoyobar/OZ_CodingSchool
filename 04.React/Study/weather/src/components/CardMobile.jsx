import useTempData from '../hooks/useTempData';
import template from '../assets/template.png';
import { useContext } from 'react';
import { WeatherStateContext } from '../App';

export default function CardMobile({ weather, index }) {
    const { slide } = useContext(WeatherStateContext);
    const tempData = useTempData(weather[0], index);

    return (
        <div className='relative font-mono'>
            <div className='w-10 h-10 bg-slate-200 rounded-xl flex flex-col justify-center items-center'>
                <img
                    className='rounded-sm relative z-10'
                    src={
                        tempData
                            ? `https://openweathermap.org/img/wn/${weather[slide][index].weatherIcon}@2x.png`
                            : template
                    }
                ></img>
            </div>
            <div className='absolute w-10 h-7 bg-gradient-to-t to-gray-600 from-gray-800 -bottom-1 rounded-xl'></div>
        </div>
    );
}
