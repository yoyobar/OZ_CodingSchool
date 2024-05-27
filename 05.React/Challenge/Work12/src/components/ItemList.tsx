import { useEffect, useState } from 'react';
import { useApp } from '../context/AppUse';
import IncomeItem from './ItemItem';
import { DataType } from '../type';

interface ItemListProps {
    type: string;
}

const ItemList = ({ type }: ItemListProps) => {
    const [data, setData] = useState<DataType[]>();
    const { state } = useApp();

    useEffect(() => {
        switch (type) {
            case '수입':
                setData(state.incomes);
                break;
            case '지출':
                setData(state.expenses);
                break;
        }
    }, [type, state.incomes, state.expenses]);

    const [input, setInput] = useState('');

    if (!data) return <div>Loading...</div>;

    const filteredState = data.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));

    return (
        <>
            <div className='w-full pl-4 pr-4'>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className='w-full border p-2 mb-6 mt-6 rounded-md'
                    placeholder='검색하기...'
                ></input>
            </div>
            <div className='overflow-y-scroll h-[100px]'>
                {filteredState.map((item) => (
                    <IncomeItem type={type} key={item.id} {...item} />
                ))}
            </div>
        </>
    );
};

export default ItemList;
