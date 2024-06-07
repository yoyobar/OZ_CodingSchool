const MovieCardSkeleton = () => {
    return (
        <div className='w-full h-full mb-8 animate-pulse'>
            <div className='rounded-md bg-slate-300 opacity-95 cursor-pointer pl-2 pr-2'>
                <div
                    className='rounded-md transition w-full h-[240px] mb:h-[250px] xl:h-[350px]'
                    src={`http://via.placeholder.com/1280x1280`}
                />
                <div className='h-6 flex justify-center'>
                    <div className='w-2/3 h-4 bg-gray-400 rounded-md'></div>
                </div>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
