import { useApp } from '../context/AppUse';
import { IdType } from '../type';

interface ItemItemProps {
    id: IdType;
    name: string;
    cost: number;
    type: string;
}

const ItemItem = ({ id, name, cost, type }: ItemItemProps) => {
    const { deleteExpense, deleteIncome } = useApp();

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        switch (type) {
            case '수입':
                deleteIncome(e.currentTarget.value as IdType);
                break;
            case '지출':
                deleteExpense(e.currentTarget.value as IdType);
                break;
        }
    };

    return (
        <div className='flex gap-4 p-2 mb-2 border rounded-md border-collapse justify-between pl-4 pr-4'>
            <div className='flex-grow'>{name}</div>
            <div className={`rounded-lg text-white pl-2 pr-2 text-center min-w-16 ${type === '수입' ? 'bg-green-700' : 'bg-red-700'}`}>
                {cost.toLocaleString()}
            </div>
            <button onClick={deleteHandler} className='rounded-full text-white bg-slate-600 pl-2 pr-2 hover:bg-slate-950' value={id}>
                X
            </button>
        </div>
    );
};

export default ItemItem;
