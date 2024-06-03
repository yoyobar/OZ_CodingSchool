import { useNavigate } from 'react-router-dom';
const MovieCard = ({ movies }) => {
    const router = useNavigate();

    const imgHandler = (id) => {
        router(`/detail/${id}`);
    };
    return (
        <div className='w-full pl-20 pr-20 h-full bg-slate-800 '>
            <div className='w-full flex flex-wrap gap-2 justify-center pt-4 select-none'>
                {movies.map((item) => (
                    <div
                        onClick={() => {
                            imgHandler(item.id);
                        }}
                        className='w-[300px] p-1 rounded-md bg-slate-800 cursor-pointer lg:w-2/8'
                        key={item.id}
                    >
                        <div className='text-white text-center'>{item.title}</div>
                        <div className='text-center text-white'>⭐️ {item.vote_average}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCard;
