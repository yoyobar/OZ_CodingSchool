export default function Search() {
    return (
        <div className='w-full flex justify-center mt-12'>
            <input
                className='focus:bg-slate-400 ml-4 mr-4 w-full p-1 pl-8 rounded-lg outline-none bg-slate-200 placeholder:text-slate-600'
                placeholder='Search Location...'
            ></input>
        </div>
    );
}
