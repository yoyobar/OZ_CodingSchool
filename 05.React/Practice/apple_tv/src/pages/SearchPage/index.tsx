import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MovieType } from '../../types';
import styled from 'styled-components';
import useDebounce from '../../hooks/useDebounce';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState<MovieType[]>([]);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const navigate = useNavigate();

    const query = useQuery();
    const searchTerm = query.get('q');
    const debouncedSearchTerm = useDebounce(query.get('q'), 500);

    const fetchSearchMovie = async (searchTerm: string) => {
        try {
            const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
            setSearchResults(response.data.results);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm as string);
        }
    }, [debouncedSearchTerm]);

    if (searchResults.length > 0) {
        return (
            <Container>
                <MovieWrapper>
                    {searchResults.map((movie) => {
                        if (movie.backdrop_path !== null && movie.media_type !== 'person') {
                            const movieImageUrl = `https://image.tmdb.org/t/p/w500` + movie.backdrop_path;

                            return (
                                <Movie className='movie' key={movie.id}>
                                    <Poster className='movie_column_poster' onClick={() => navigate(`/${movie.id}`)}>
                                        <PosterImg src={movieImageUrl} alt='movie' className='movie__poster' />
                                    </Poster>
                                </Movie>
                            );
                        }
                    })}
                </MovieWrapper>
            </Container>
        );
    } else {
        return (
            <Results className='no_results'>
                <Results_text className='no_results_text'>
                    <p>찾고자 하는 검색어 {searchTerm}에 맞는 영화가 없습니다.</p>
                </Results_text>
            </Results>
        );
    }
};

const Container = styled.div`
    background-color: black;
    height: 100vh;
    overflow-x: hidden;
`;
const Movie = styled.div`
    flex: 1 1 auto;
    display: inline-block;
    padding-right: 0.5rem;
    padding-bottom: 7rem;
`;
const Poster = styled.div`
    position: relative;
    margin-top: 1rem;
    cursor: pointer;
    transition: transform 0.3s;
    -webkit-transition: transform 0.3s;

    &&:hover {
        transform: scale(1.25);
        z-index: 9999;
    }
`;
const PosterImg = styled.img`
    width: 220px;
    border-radius: 5px;
`;
const Results = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c5c5c5;
    padding: 8rem;
    height: 100%;
`;
const Results_text = styled.div`
    font-size: 1.5rem;
`;

const MovieWrapper = styled.div`
    width: 100%;
    text-align: center;
    padding: 5rem 0;
    height: 100vh;
`;

export default SearchPage;
