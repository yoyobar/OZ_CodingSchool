const MovieCardSkeleton = () => {
    return (
        <div className='w-full h-full mb-8 animate-pulse'>
            <div className='rounded-md bg-slate-950 opacity-95 cursor-pointer pl-2 pr-2'>
                <div
                    className='rounded-md transition w-full h-[240px] mb:h-[250px] xl:h-[350px]'
                    src={`http://via.placeholder.com/1280x1280`}
                />
                <div className='border-b-4 h-6'></div>
                <div className='border-b-4 h-6'></div>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
