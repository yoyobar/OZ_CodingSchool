import axios from '../api/axios';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MovieType } from '../types';
import MovieModal from './MovieModal/MovieModal';
import { basePath } from '../constant';

const Container = styled.div`
    margin: 5rem 2.5rem;
`;

const Slider = styled.div`
    position: relative;

    &&:hover .Slider_Left {
        visibility: visible;
    }

    &&:hover .Slider_Right {
        visibility: visible;
    }
`;
const Slider_Left = styled.div`
    background-clip: content-box;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;

    &&:hover {
        background: rgba(20, 20, 20, 0.5);
        border-radius: 0.5rem;
        transition: 400ms all ease-in-out;
    }
`;
const Slider_Right = styled.div`
    background-clip: content-box;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 1000;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;

    &&:hover {
        background: rgba(20, 20, 20, 0.5);
        border-radius: 0.5rem;
        transition: 400ms all ease-in-out;
    }
`;
const Poster = styled.img`
    object-fit: contain;
    width: 100%;
    max-height: 144px;
    transition: transform 450ms;
    border-radius: 4px;
    margin-right: 10px;

    &&:hover {
        transform: scale(1.08);
    }
`;

const PosterContainer = styled.div`
    display: flex;
    overflow: hidden;
    padding: 20px 0 20px 20px;
    scroll-behavior: smooth;
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
            <Slider>
                <Slider_Left
                    onClick={() => {
                        document.getElementById(id)!.scrollLeft -= window.innerWidth - 80;
                    }}
                    className='Slider_Left'
                >
                    {'<'}
                </Slider_Left>
                <PosterContainer id={id}>
                    {movies.map((movie) => (
                        <Poster
                            onClick={() => handleClick(movie)}
                            alt={movie.name}
                            key={movie.id}
                            src={`${basePath}${movie.backdrop_path}`}
                        ></Poster>
                    ))}
                </PosterContainer>
                <Slider_Right
                    onClick={() => {
                        document.getElementById(id)!.scrollLeft += window.innerWidth - 80;
                    }}
                    className='Slider_Right'
                >
                    {'>'}
                </Slider_Right>
            </Slider>

            {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
        </Container>
    );
};

export default Row;
