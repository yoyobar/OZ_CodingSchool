import { useEffect, useState } from 'react';
import { useApp } from '../context/AppUse';

interface ItemTotalProps {
    type: string;
}

const ItemTotal = ({ type }: ItemTotalProps) => {
    const { state } = useApp();
    const [text, setText] = useState<string>('');
    const [total, setTotal] = useState<string>('0');
    useEffect(() => {
        const income = state.incomes.reduce((pre, curr) => (pre += curr.cost), 0);
        const expense = state.expenses.reduce((pre, curr) => (pre += curr.cost), 0);

        switch (type) {
            case '수입':
                setText(`총 수입 : `);
                setTotal(income.toLocaleString());
                break;
            case '지출':
                setText(`총 지출 : `);
                setTotal(expense.toLocaleString());
        }
    }, [state, type]);

    return (
        <div>
            {text}
            {total}원
        </div>
    );
};

export default ItemTotal;
