import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from './Carousel';

export default function Content() {
    const weeklyCarousel = [1, 2, 3, 4, 5, 6, 7];

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: 'slides',
        appendDots: (dots) => (
            <div
                style={{
                    borderRadius: '10px',
                    padding: '10px',
                }}
            >
                <ul style={{ margin: '20px' }}> {dots} </ul>
            </div>
        ),
    };
    return (
        <div className='w-full h-full flex justify-center mt-8'>
            <div className='min-w-96'>
                <Slider {...settings}>
                    {weeklyCarousel.map((item) => (
                        <Carousel key={item} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}
