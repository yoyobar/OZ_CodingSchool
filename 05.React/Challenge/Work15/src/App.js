import { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const addHandler = () => {
        setCount((prev) => prev + 1);
    };
    const minusHandler = () => {
        setCount((prev) => prev - 1);
    };
    const toggleHandler = () => {
        setDisabled(!disabled);
    };

    return (
        <div className='select-none'>
            <header className='w-full h-[100vh] flex flex-col justify-center items-center'>
                <div className='text-center w-[200px] bg-slate-200 rounded-md p-2 mb-4'>
                    <h3 data-testid='counter'>{count}</h3>
                </div>
                <div className='flex gap-4'>
                    <button
                        className={
                            disabled
                                ? 'bg-slate-900 hover:bg-slate-900 text-white p-2 w-[100px] rounded-md transition'
                                : 'bg-slate-400 hover:bg-slate-600 text-white p-2 w-[100px] rounded-md transition'
                        }
                        disabled={disabled}
                        onClick={minusHandler}
                        data-testid='minus-button'
                    >
                        -
                    </button>
                    <button
                        className={
                            disabled
                                ? 'bg-slate-900 hover:bg-slate-900 text-white p-2 w-[100px] rounded-md transition'
                                : 'bg-slate-400 hover:bg-slate-600 text-white p-2 w-[100px] rounded-md transition'
                        }
                        disabled={disabled}
                        onClick={addHandler}
                        data-testid='plus-button'
                    >
                        +
                    </button>
                </div>
                <button
                    className='bg-indigo-400 mt-4 hover:bg-indigo-600 p-2 rounded-md transition text-white'
                    onClick={toggleHandler}
                    data-testid='toggle-button'
                >
                    ON/OFF
                </button>
            </header>
        </div>
    );
}

export default App;
