import { useEffect, useState } from 'react';
import { useApp } from '../context/AppUse';

const Remaining = () => {
    const { state } = useApp();
    const [remain, setRemain] = useState<string>('0');
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        const incomeData = state.incomes.reduce((pre, curr) => {
            return (pre += curr.cost);
        }, 0);
        const expenseData = state.expenses.reduce((pre, curr) => {
            return (pre += curr.cost);
        }, 0);

        const data = incomeData - expenseData;

        if (data <= 0) {
            setIsOver(true);
        } else {
            setIsOver(false);
        }

        setRemain(data.toLocaleString());
    }, [state]);

    return (
        <div className={`rounded-md p-6 w-full min-w-32 text-teal-900 ${isOver ? 'bg-red-200' : 'bg-emerald-300'}`}>
            남은 금액 : {remain} 원
        </div>
    );
};

export default Remaining;
