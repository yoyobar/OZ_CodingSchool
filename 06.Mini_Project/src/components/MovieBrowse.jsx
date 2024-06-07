import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requests from '../api/request';
import Loading from './Loading';

const MovieBrowse = () => {
    const [movies, setMovies] = useState([]);
    const router = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const handleObserver = (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0,
        });
        const observerTarget = document.getElementById('observer');

        if (observerTarget) {
            observer.observe(observerTarget);
        }

        return () => {
            observer.disconnect();
        };
    }, [isLoading]);

    const imgHandler = (id) => {
        router(`/main/${id}`);
    };

    useEffect(() => {
        async function fetchData(request, page) {
            setIsLoading(true);
            const response = await axios.get(request, {
                params: { page: page },
            });
            const filterData = filterMovie(response.data.results);
            setMovies((prevMovies) => [...prevMovies, ...filterData]);
            setIsLoading(false);
        }

        fetchData(requests.fetchTopRated, page);
    }, [page]);

    function filterMovie(data) {
        const filterList = data.filter((item) => item.title !== null && item.title !== undefined && item.backdrop_path !== null);
        return filterList;
    }

    return (
        <>
            <div className='w-full h-full flex flex-wrap justify-center gap-1'>
                {movies.map((item) => {
                    let truncatedTitle = item.title;
                    if (item.title.length > 12) {
                        truncatedTitle = `${item.title.substring(0, 12)}...`;
                    }
                    return (
                        <div
                            onClick={() => {
                                imgHandler(item.id);
                            }}
                            className='w-1/3 lg:w-[300px] rounded-md cursor-pointer flex flex-col justify-center items-center flex-wrap'
                            key={item.id}
                        >
                            <img
                                className='scale-95 hover:scale-100 rounded-md transition w-full'
                                src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
                            />
                            <div className='text-white'>{truncatedTitle}</div>
                        </div>
                    );
                })}
                <div id='observer'></div>
            </div>
            {isLoading && <Loading />}
        </>
    );
};

export default MovieBrowse;
