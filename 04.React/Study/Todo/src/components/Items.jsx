import Item from './Item';

export default function Items({ todo, todoDelete, todoUpdate }) {
    return (
        <>
            <ul className='bg-slate-100 pl-2 pt-2 h-80 overflow-y-scroll flex flex-col gap-2 w-full '>
                {todo.map((item) => {
                    return <Item key={item.id} {...item} todoUpdate={todoUpdate} todoDelete={todoDelete}></Item>;
                })}
            </ul>
        </>
    );
}
