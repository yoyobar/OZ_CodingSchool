import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const MovieCard = ({ movies }) => {
    const router = useNavigate();

    const imgHandler = (id) => {
        router(`/detail/${id}`);
    };
    return (
        <div className='w-full pl-20 pr-20 mt-4 h-full bg-slate-800 '>
            <div className='text-2xl font-bold text-white'>TOP RATED</div>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={4}
                className='w-full flex flex-wrap gap-2 justify-center pt-4 select-none'
            >
                {movies.map((item) => (
                    <SwiperSlide
                        onClick={() => {
                            imgHandler(item.id);
                        }}
                        className='w-[300px] p-1 rounded-md bg-slate-800 cursor-pointer lg:w-2/8'
                        key={item.id}
                    >
                        <img className='rounded-md' src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} />
                        <div className='text-white text-center'>{item.title}</div>
                        <div className='text-center text-white'>⭐️ {item.vote_average}</div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieCard;
