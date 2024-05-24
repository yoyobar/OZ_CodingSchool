import axios from '../api/axios';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MovieType } from '../types';
import MovieModal from './MovieModal/MovieModal';
import { basePath } from '../constant';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';

const Container = styled.div`
    margin: 5rem 2.5rem;
`;

const Poster = styled.img`
    object-fit: cover;
    width: 100%;
    margin: 10px;
    max-height: 180px;
    transition: transform 450ms;
    margin-right: 10px;
    border-radius: 10px;
    padding: 2px;

    &&:hover {
        transform: scale(1.08);
        background-color: ghostwhite;
    }
`;

interface RowProps {
    title: string;
    id: string;
    fetchUrl: string;
}

const Row = ({ title, id, fetchUrl }: RowProps) => {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [movieSelected, setMovieSelected] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const handleClick = (movie: MovieType) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };

    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        const data: MovieType[] = response.data.results;
        setMovies(data);
    }, [fetchUrl]);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    return (
        <Container>
            <h2>{title}</h2>
            <Swiper loop={true} slidesPerView={6} spaceBetween={20} id={id}>
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <Poster onClick={() => handleClick(movie)} alt={movie.name} src={`${basePath}${movie.backdrop_path}`}></Poster>
                    </SwiperSlide>
                ))}
            </Swiper>

            {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
        </Container>
    );
};

export default Row;
