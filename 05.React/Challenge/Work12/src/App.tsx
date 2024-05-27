import { useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import ItemTotal from './components/ItemTotal';
import Remaining from './components/Remaining';
import { useApp } from './context/AppUse';

let mount = false;

function App() {
    const { state, updateData } = useApp();
    useEffect(() => {
        const form = {
            expenses: state.expenses,
            incomes: state.incomes,
        };

        if (mount) {
            localStorage.setItem('Item', JSON.stringify(form));
        } else {
            mount = true;
        }
    }, [state]);

    useEffect(() => {
        const loadData = JSON.parse(localStorage.getItem('Item')!);

        if (loadData) {
            updateData(loadData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='min-w-[600px] flex flex-col gap-4 select-none rounded-md p-2 mt-4'>
                <article>
                    <div className='text-2xl mb-4'>지출 계획</div>
                    <div className='flex gap-2 w-full justify-between'>
                        <Remaining />
                        <div className='rounded-md p-6 w-full min-w-32 bg-gray-300'>
                            <ItemTotal type={'지출'} />
                        </div>
                        <div className='rounded-md p-6 w-full min-w-32 bg-gray-300'>
                            <ItemTotal type={'수입'} />
                        </div>
                    </div>
                </article>
                <article>
                    <div className='text-2xl mt-4'>지출 목록</div>
                    <div>
                        <ItemList type={'지출'} />
                    </div>
                </article>
                <article>
                    <div className='text-2xl'>수입 목록</div>
                    <div>
                        <ItemList type={'수입'} />
                    </div>
                </article>
                <article>
                    <div className='text-2xl mb-2'>지출 추가</div>
                    <div className='p-4 border border-red-600 rounded-md'>
                        <ItemForm type={'지출'} />
                    </div>
                </article>
                <article>
                    <div className='text-2xl mb-2'>수입 추가</div>
                    <div className='p-4 border border-green-600 rounded-md'>
                        <ItemForm type={'수입'} />
                    </div>
                </article>
            </div>
        </>
    );
}

export default App;
