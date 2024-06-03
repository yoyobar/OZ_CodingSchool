const Loading = () => {
    return (
        <div className='w-full h-full bg-slate-800 flex justify-center items-center'>
            <div className='w-[100px] h-[100px] animate bg-slate-800 '>
                <div className='border-indigo-600 border-8 rounded-full border-dashed animate-spin w-full h-full '></div>
            </div>
        </div>
    );
};

export default Loading;
