import { useEffect, useState } from 'react';
import { MovieType } from '../types';
import requests from '../api/request';
import axios from '../api/axios';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0 4rem;
    height: 440px;

    @media screen and (min-width: 1500px) {
        height: 600px;
    }
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    color: black;
    cursor: pointer;
    border: none;
    font-weight: 500;
    box-shadow: 1px 1px 1px black;

    &&:hover {
        filter: brightness(0.8);
        transition: filter 0.5s;
    }
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.5rem;
    text-shadow: 3px 3px 3px black;
`;

const Overview = styled.p`
    width: 45rem;
    line-height: 1.3rem;
    padding-top: 1rem;
    font-weight: 500;
    font-size: 1rem;
    color: ghostwhite;
    text-shadow: 1px 1px 1px black;
`;

const Fade = styled.div`
    position: relative;
    bottom: 115px;
    height: 7.4rem;
    width: 100%;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
`;

const Banner = () => {
    const [movie, setMovie] = useState<MovieType>();
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const request = await axios.get(requests.fetchNowPlaying);
        const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

        const { data: movieDetail }: { data: MovieType } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: 'videos' },
        });

        setMovie(movieDetail);
    };

    const truncate = (str: string, n: number) => {
        return str?.length > n ? str.substring(0, n) + '...' : str;
    };
    if (!movie) {
        return <div>Loading...</div>;
    } else {
        return isClicked ? (
            <Container>
                <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&`}></Iframe>
                <Button
                    onClick={() => {
                        setIsClicked(false);
                    }}
                >
                    PAUSE
                </Button>
            </Container>
        ) : (
            <Container>
                <div
                    style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                        backgroundPosition: 'top center',
                        backgroundSize: 'cover',
                        padding: '20px',
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <Title>{movie.title || movie.name || movie.original_name}</Title>
                        <div>{movie.videos?.results[0]?.key && <Button onClick={() => setIsClicked(true)}>PLAY</Button>}</div>
                        <Overview>{truncate(movie.overview, 100)}</Overview>
                    </div>
                </div>
                <Fade />
            </Container>
        );
    }
};

export default Banner;
