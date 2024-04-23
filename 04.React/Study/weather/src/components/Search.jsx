import { useContext, useState } from 'react';
import { WeatherStateContext } from '../App';

export default function Search() {
    const { weatherApiSearch } = useContext(WeatherStateContext);
    const cityDataKr = ['서울', '부산', '대구', '대전', '광주', '인천'];
    const cityData = ['Seoul', 'Busan', 'Daegu', 'Daejeon', 'Gwangju', 'Incheon'];
    const [show, setShow] = useState(false);
    const [input, setInput] = useState('');

    const inputChange = (e) => {
        setInput(e.target.value);
    };
    const citySelect = (e) => {
        weatherApiSearch(e.target.value);
    };
    const searchSubmit = () => {
        if (cityDataKr.includes(input.trim(), 0)) {
            const index = cityDataKr.indexOf(input.trim(), 0);
            return weatherApiSearch(cityData[index]);
        }
        if (cityData.includes(input.trim(), 0)) {
            const index = cityData.indexOf(input.trim(), 0);
            return weatherApiSearch(cityData[index]);
        } else {
            return alert('지원하지 않는 지역입니다.');
        }
    };
    const searchEnter = (e) => {
        if (e.key === 'Enter' && !e.repeat) {
            searchSubmit();
            setInput('');
        }
    };
    const searchFocus = () => {
        setShow(true);
    };
    const searchBlur = () => {
        setTimeout(() => {
            setShow(false);
        }, 100);
    };

    return (
        <div className='relative w-full flex-col justify-center mt-12'>
            <input
                value={input}
                onKeyDown={searchEnter}
                onFocus={searchFocus}
                onBlur={searchBlur}
                onChange={inputChange}
                className='focus:bg-slate-400 w-full p-1 pl-8 rounded-lg outline-none bg-slate-200 placeholder:text-slate-600'
                placeholder='Search Location...'
            ></input>
            {show && (
                <div className='absolute flex flex-col ml-4 mr-4 top-10 w-full z-10'>
                    {cityData.map((item, index) => (
                        <button
                            onClick={citySelect}
                            value={item}
                            className='w-36 text-center rounded-sm hover:bg-slate-600 hover:text-white font-mono text-slate-600 bg-slate-400 mb-1 border-b border-slate-700'
                            key={index}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        onClick={searchSubmit}
                        className='absolute font-mono top-0 left-40 text-white bg-green-600 hover: p-1 rounded-lg'
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
