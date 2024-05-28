import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALL, COMPLETED, NOT_COMPLETED, checkAllTodo, deleteMarkTodo, filterTodo } from '../store/todoSlice';
const Option = () => {
    const todoData = useSelector((state) => state.todo.data);
    const [sort, setSort] = useState(ALL);
    const [remain, setRemain] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const remainTodo = todoData.filter((item) => item.completed === false);
        setRemain(remainTodo.length);
    }, [todoData]);

    const markAllHandler = () => {
        dispatch(checkAllTodo());
    };
    const deleteMarkHandler = () => {
        dispatch(deleteMarkTodo());
    };

    const selectedAllHandler = () => {
        setSort(ALL);
        dispatch(filterTodo(ALL));
    };
    const selectedCompleteHandler = () => {
        setSort(COMPLETED);
        dispatch(filterTodo(COMPLETED));
    };
    const selectedNotCompleteHandler = () => {
        setSort(NOT_COMPLETED);
        dispatch(filterTodo(NOT_COMPLETED));
    };
    return (
        <>
            <div className='w-full border-t flex pt-2 pb-2'>
                <div className='flex flex-grow flex-col items-center text-sm border-r'>
                    <div className='font-bold'>동작</div>
                    <button className='hover:text-slate-400' onClick={markAllHandler}>
                        전체 완료
                    </button>
                    <button onClick={deleteMarkHandler} className='hover:text-slate-400'>
                        완료된 투두 삭제
                    </button>
                </div>
                <div className='flex flex-grow flex-col items-center text-sm border-r'>
                    <div className='font-bold'>남은 Todos</div>
                    <div>
                        <span className='pl-1 pr-1 bg-slate-200 rounded-sm mr-2'>{remain}</span>
                        <span>개 남음</span>
                    </div>
                </div>
                <div className='flex flex-grow flex-col items-center text-sm'>
                    <div className='font-bold'>상태별 분류</div>
                    <button onClick={selectedAllHandler} className={sort === ALL ? 'font-bold' : 'hover:text-slate-400'}>
                        전체
                    </button>
                    <button onClick={selectedCompleteHandler} className={sort === COMPLETED ? 'font-bold' : 'hover:text-slate-400'}>
                        완료
                    </button>
                    <button onClick={selectedNotCompleteHandler} className={sort === NOT_COMPLETED ? 'font-bold' : 'hover:text-slate-400'}>
                        미완료
                    </button>
                </div>
            </div>
        </>
    );
};

export default Option;
