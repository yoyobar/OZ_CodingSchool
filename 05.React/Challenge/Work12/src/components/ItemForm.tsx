import { useState } from 'react';
import { useApp } from '../context/AppUse';

interface ItemFromProps {
    type: string;
}

const ItemForm = ({ type }: ItemFromProps) => {
    const { addExpense, addIncome } = useApp();
    const [inputName, setInputName] = useState<string>('');
    const [inputCost, setInputCost] = useState<string>('');

    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = {
            name: inputName,
            cost: Number(inputCost),
        };

        switch (type) {
            case '지출':
                addExpense(form);
                setInputName('');
                setInputCost('');
                break;
            case '수입':
                addIncome(form);
                setInputName('');
                setInputCost('');
                break;
        }
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'name':
                setInputName(e.target.value);
                break;
            case 'cost':
                setInputCost(e.target.value);
                break;
        }
    };
    return (
        <>
            <form onSubmit={formHandler} className='flex flex-col gap-4'>
                <div>
                    {type === '지출' && '지출'}
                    {type === '수입' && '수입'}
                </div>
                <input
                    required
                    onChange={inputHandler}
                    value={inputName}
                    name='name'
                    className='p-2 rounded-md bg-slate-100 w-3/6'
                    placeholder='명칭...'
                ></input>
                <div>
                    {type === '지출' && '지출 금액'}
                    {type === '수입' && '수입 금액'}
                </div>
                <input
                    required
                    onChange={inputHandler}
                    value={inputCost}
                    name='cost'
                    type='number'
                    className='p-2 rounded-md bg-slate-100 w-full'
                    placeholder='금액...'
                ></input>
                <button type='submit' className='w-[100px] text-white p-2 rounded-md bg-indigo-400 hover:bg-indigo-600'>
                    추가
                </button>
            </form>
        </>
    );
};

export default ItemForm;
