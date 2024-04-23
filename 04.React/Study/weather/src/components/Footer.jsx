import { useMediaQuery } from 'react-responsive';
import Card from './Card';
import CardMobile from './CardMobile';
import { useContext } from 'react';
import { WeatherStateContext } from '../App';

export default function FootCard() {
    // const { weather } = useContext(WeatherStateContext);
    const isMobile = useMediaQuery({ maxWidth: '1024px' });
    const mockData = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className='flex justify-center gap-6 w-full mt-12'>
            {mockData.map((item) => (!isMobile ? <Card key={item} /> : <CardMobile key={item} />))}
        </div>
    );
}
