import styled from 'styled-components';
import Card from './Card';
import Loading from './Loading';

const Main = styled.div`
    width: 840px;
    display: flex;
    flex-wrap: wrap;
    height: 50%;
    background-color: aliceblue;
    overflow-y: auto;
`;

interface GalleryProp {
    card: {
        url: string;
        id: string;
    }[];
}

export default function Gallery({ card }: GalleryProp) {
    return (
        <Main>
            {card ? (
                card.map((item) => {
                    return <Card key={item.id} url={item.url} />;
                })
            ) : (
                <Loading />
            )}
        </Main>
    );
}
