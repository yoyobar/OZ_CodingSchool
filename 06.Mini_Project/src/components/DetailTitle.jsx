const DetailTitle = ({ title, vote_average }) => {
    return (
        <div className='flex h-1/6 rounded-md  p-2 items-center'>
            <div className='flex-grow text-3xl font-bold text-white'>
                <div>{title}</div>
            </div>

            <div className='w-[100px] text-2xl font-bold text-white bg-red-600 rounded-md text-center'>{vote_average}</div>
        </div>
    );
};

export default DetailTitle;
