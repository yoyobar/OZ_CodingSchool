import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import { Navigation, Autoplay } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import axios from '../api/axios';
import request from '../api/request';
import { useNavigate } from 'react-router-dom';
import MovieCardSkeleton from './skeleton/MovieCardSkeleton';

const MovieCard = ({ type, data }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useNavigate();
    const ref = useRef(0);

    useEffect(() => {
        function filterMovie(data) {
            const filterList = data.filter((item) => item.title !== null && item.title !== undefined && item.backdrop_path !== null);
            return filterList;
        }

        async function fetchData(request) {
            const response = await axios.get(request);

            const filterData = filterMovie(response.data.results);
            setMovies(filterData);

            const loadingTimer = setTimeout(() => {
                setLoading(false);

                return () => {
                    clearInterval(loadingTimer);
                };
            }, 1000);
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
            case 'SEARCH':
                setMovies(filterMovie(data));
                break;
        }
    }, [type, data]);

    const imgHandler = (id) => {
        if (type === 'REGISTER') return;
        router(`/main/${id}`);
    };

    if (loading) {
        return (
            <div className='overflow-hidden flex flex-col text-center justify-center items-center gap-4 mt-4 w-full h-full'>
                <div className='text-2xl font-bold text-white'>{type !== 'REGISTER' && type}</div>
                <MovieCardSkeleton />
            </div>
        );
    } else {
        return (
            <div className='overflow-hidden flex flex-col text-center justify-center items-center gap-4 mt-4 w-full h-full'>
                <div className='text-2xl font-bold text-white'>{type !== 'REGISTER' && type}</div>
                <Swiper
                    autoplay={{
                        delay: 4000,
                    }}
                    centeredSlides={true}
                    modules={[Navigation, Autoplay]}
                    className='w-full h-full mb-8'
                >
                    {movies.map((item) => (
                        <SwiperSlide
                            onClick={() => {
                                imgHandler(item.id);
                            }}
                            className='rounded-md  opacity-95 cursor-pointer pl-2 pr-2'
                            key={ref.current++}
                        >
                            <img
                                className='rounded-t-md transition w-full h-[240px] mb:h-[250px] xl:h-[350px]'
                                src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
                            />
                            <div className='text-white text-center bg-slate-950'>{item.title ? item.title : '제목 정보 없음'}</div>
                            <div className='text-center text-white bg-slate-950 rounded-b-md'>
                                {type !== 'REGISTER' && item.vote_average}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    }
};
export default MovieCard;
