const DetailTag = ({ genres }) => {
    return (
        <div className='w-full h-1/6 bg-slate-700 rounded-md flex justify-center items-center gap-4'>
            {genres.map((item) => (
                <div className='p-2 rounded-md bg-indigo-600 text-white w-[100px] text-center' key={item.id}>
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default DetailTag;
