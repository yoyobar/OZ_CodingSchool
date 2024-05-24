import styled from 'styled-components';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/request';
import { useEffect } from 'react';
import { useModal } from '../../store';
import { useNavigate } from 'react-router-dom';

const Container = styled.main`
    position: relative;
    display: block;
    top: 50px;
    height: 100%;
    padding: 0 calc() (3.5vw + 5px);
`;

const MainPage = () => {
    const navigate = useNavigate();

    const { modalOn } = useModal();

    return (
        <Container>
            <Banner />
            <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
            <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated} />
            <Row title='Action Movie' id='AM' fetchUrl={requests.fetchActionMovies} />
            <Row title='Comedy Movies' id='CM' fetchUrl={requests.fetchComedyMovies} />
        </Container>
    );
};

export default MainPage;
