const DetailTitle = ({ title, vote_average }) => {
    return (
        <div className='flex h-1/6 rounded-md bg-slate-700 p-2 items-center'>
            <div className='flex-grow text-3xl font-bold text-white'>
                <div>{title}</div>
            </div>

            <div className='w-[100px] text-2xl font-bold text-orange-600 bg-slate-200 rounded-md text-center'>{vote_average}</div>
        </div>
    );
};

export default DetailTitle;
