import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import request from '../api/request';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ type }) => {
    const [movies, setMovies] = useState([]);
    const router = useNavigate();

    useEffect(() => {
        async function fetchData(request) {
            const response = await axios.get(request);
            setMovies(response.data.results);
        }

        switch (type) {
            case 'TOP_RATED':
                fetchData(request.fetchTopRated);
                break;
            case 'NOW_PLAYING':
                fetchData(request.fetchNowPlaying);
                break;
            case 'TRENDING':
                fetchData(request.fetchTrending);
                break;
            case 'REGISTER':
                fetchData(request.fetchNowPlaying);
                break;
        }
    }, [type]);

    const imgHandler = (id) => {
        if (type === 'REGISTER') return;
        router(`/main/${id}`);
    };

    return (
        <div className='flex flex-col gap-4 pl-5 pr-5 mt-4 lg:pl-20 lg:pr-20'>
            <div className='text-2xl font-bold text-white'>{type !== 'REGISTER' && type}</div>
            <Swiper
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 25,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                }}
                modules={[Navigation]}
                className='w-full h-full'
            >
                {movies.map((item) => (
                    <SwiperSlide
                        onClick={() => {
                            imgHandler(item.id);
                        }}
                        className=' rounded-md  bg-slate-800 cursor-pointer lg:w-2/8'
                        key={item.id}
                    >
                        <img
                            className='rounded-md scale-95 hover:scale-100 transition'
                            src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
                        />
                        <div className='text-white text-center'>{item.title ? item.title : '제목 정보 없음'}</div>
                        <div className='text-center text-white'>{type !== 'REGISTER' && item.vote_average}</div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
export default MovieCard;
