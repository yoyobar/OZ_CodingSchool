import styled from 'styled-components';

interface CardProp {
    url: string;
}

const Img = styled.img`
    padding: 5px;
    border-radius: 10px;
    width: 400px;
    height: 250px;
`;

export default function Card({ url }: CardProp) {
    console.log(url);
    return (
        <>
            <Img src={url}></Img>
        </>
    );
}
