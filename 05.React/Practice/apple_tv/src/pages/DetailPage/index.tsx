import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieType } from '../../types';
import { basePath } from '../../constant';
import styled from 'styled-components';

const DetailPage = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState<MovieType>();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`movie/${movieId}`);
            setMovie(response.data);
        }
        fetchData();
    }, [movieId]);

    if (!movie) return null;

    return (
        <>
            <Container>
                <Banner src={`${basePath}${movie.backdrop_path}`} />
                <Information>
                    <Flex>
                        <FlexCol>
                            <Title>{movie.title}</Title>
                            <Tag>{movie.tagline}</Tag>
                        </FlexCol>
                        <Type>
                            {movie.genres.map((item) => {
                                return <div>{item.name}</div>;
                            })}
                        </Type>
                        <Score>✨ {movie.vote_average}</Score>
                        <Button onClick={() => navigate('/main')}>닫기</Button>
                    </Flex>
                </Information>
                <Content>{movie.overview}</Content>
            </Container>
        </>
    );
};

export default DetailPage;

const Container = styled.div`
    position: relative;
    top: 70px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
const Banner = styled.img`
    background-color: black;
    filter: brightness(0.4);
    height: 1200px;

    @media screen and (max-width: 768px) {
        height: 400px;
    }
`;
const Information = styled.div`
    position: absolute;
    padding: 3rem;
`;

const Flex = styled.div`
    display: flex;
`;
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    font-weight: 900;
    font-size: 4rem;
    flex-grow: 1;

    @media screen and (max-width: 768px) {
        font-size: 4rem;
        flex-grow: 1;
    }
`;
const Tag = styled.div`
    font-weight: 200;
    font-size: 2rem;

    @media screen and (max-width: 768px) {
        font-size: 1.25rem;
    }
`;
const Type = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-left: 30px;
    gap: 20px;
    font-size: 2rem;
    background-color: cornflowerblue;
    height: 40px;
    padding: 5px 10px;
    border-radius: 10px;
    opacity: 0.9;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;
const Score = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 2rem;
    background-color: ghostwhite;
    height: 40px;
    padding: 5px 10px;
    margin-left: 30px;
    border-radius: 10px;
    opacity: 0.9;
    color: black;

    @media screen and (max-width: 768px) {
        font-size: 1rem;
        width: 200px;
        margin-left: 10px;
        width: 80px;
    }
`;
const Button = styled.button`
    position: absolute;
    left: 50px;
    top: 20px;
    cursor: pointer;
    padding: 0.25rem 1rem;
    background-color: cornflowerblue;
    color: white;
    border: none;
    border-radius: 5px;

    &&:hover {
        filter: brightness(0.8);
    }
`;
const Content = styled.div`
    position: absolute;
    padding: 6rem;
    top: 180px;
    width: 50%;
    font-weight: 200;
    line-height: 2rem;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;
