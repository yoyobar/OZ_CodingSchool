import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import { up, down } from './redux/reducers';
import { asyncUp, asyncDown } from './redux/action';
import { AppDispatch } from './redux/store';

interface StateType {
    counter: {
        value: number;
    };
}

const Counter = () => {
    const dispatch: AppDispatch = useDispatch();
    const count = useSelector<StateType, number>((state) => state.counter.value);

    return (
        <div className='flex gap-2 justify-center items-center mt-16 select-none'>
            <button
                onClick={() => {
                    dispatch(asyncUp(1));
                }}
                className='bg-indigo-400 hover:bg-indigo-600 text-white pl-4 pr-4 p-2 rounded-md'
            >
                async +
            </button>
            <button
                onClick={() => {
                    dispatch(up(1));
                }}
                className='bg-indigo-400 hover:bg-indigo-600 text-white pl-4 pr-4 p-2 rounded-md'
            >
                +
            </button>
            <div className='p-2 pl-4 pr-4 bg-slate-200 rounded-md text-3xl'>{count}</div>
            <button
                onClick={() => {
                    dispatch(down(1));
                }}
                className='bg-indigo-400 hover:bg-indigo-600 text-white pl-4 pr-4 p-2 rounded-md'
            >
                -
            </button>
            <button
                onClick={() => {
                    dispatch(asyncDown(1));
                }}
                className='bg-indigo-400 hover:bg-indigo-600 text-white pl-4 pr-4 p-2 rounded-md'
            >
                async -
            </button>
        </div>
    );
};

const App = () => {
    return (
        <>
            <Provider store={store}>
                <div className='text-2xl'>
                    <Counter />
                </div>
            </Provider>
        </>
    );
};

export default App;
