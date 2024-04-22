export default function ToggleBtn({ checkHandler }) {
    const onClick = () => {
        checkHandler();
    };

    return (
        <div className='ml-10 mt-4 font-mono flex gap-1'>
            <span className='text-white'>°C</span>
            <label className='inline-flex items-center cursor-pointer'>
                <input type='checkbox' onChange={onClick} className='sr-only peer' />
                <div
                    className='relative w-12 h-4 bg-gray-200 
                peer-focus:outline-none
                peer-focus:ring-blue-300 
                dark:peer-focus:ring-blue-800 rounded-full peer 
                dark:bg-gray-100
                peer-checked:after:translate-x-7
                rtl:peer-checked:after:-translate-x-full 
                after:absolute after:top-[2px] after:start-[3px] 
                after:bg-gray-700
                after:rounded-full after:h-3 after:w-3 after:transition-all 
                dark:border-gray-600 peer-checked:bg-green-500'
                ></div>
            </label>
            <span className='text-white'>°F</span>
        </div>
    );
}
