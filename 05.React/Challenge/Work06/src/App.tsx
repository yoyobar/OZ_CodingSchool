import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import Gallery from './components/Gallery';

const Main = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;
    gap: 20px;
`;

const Title = styled.h2`
    color: ghostwhite;
`;

const Input = styled.input`
    padding: 1rem;
    border-radius: 5px;
    border: none;
    width: 18rem;
`;

const Button = styled.button`
    padding: 1rem;
    border-radius: 5px;
    border: none;
    background-color: cornflowerblue;
    cursor: pointer;
    transition: filter 0.5s;
    color: white;

    &:hover {
        filter: brightness(0.9);
    }
`;

const Aside = styled.div`
    display: flex;
    gap: 1rem;
`;

const API_KEY = import.meta.env.VITE_API_URL;

interface searchDataType {
    urls: {
        small: string;
    };
    id: string;
}
interface cardDataType {
    url: string;
    id: string;
}

function App() {
    const [input, setInput] = useState('');
    const [card, setCard] = useState<cardDataType[]>([]);

    const dataFormat = (searchData: searchDataType[]) => {
        const data = searchData.map((item) => {
            return {
                url: item.urls.small,
                id: item.id,
            };
        });
        console.log(data);
        setCard([...data]);
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const buttonHandler = async () => {
        if (input.trim() === '') return;
        const { data } = await axios.get(`https://api.unsplash.com/search/photos/?query=${input}&client_id=${API_KEY}`);

        dataFormat(data.results);
        setInput('');
    };

    const keyupHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            buttonHandler();
        }
    };

    return (
        <Main>
            <Title> 원하시는 이미지를 검색하세요.</Title>
            <Aside>
                <Input value={input} onKeyUp={keyupHandler} onChange={inputHandler}></Input>
                <Button onClick={buttonHandler}>검색</Button>
            </Aside>
            {card && <Gallery card={card} />}
        </Main>
    );
}

export default App;
