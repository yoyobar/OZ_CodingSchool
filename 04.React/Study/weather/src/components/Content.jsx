import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from './Carousel';

export default function Content() {
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
        <div className='flex justify-center mt-8'>
            <div className='w-8/12'>
                <Slider {...settings}>
                    <Carousel />
                    <Carousel />
                    <Carousel />
                    <Carousel />
                    <Carousel />
                    <Carousel />
                    <Carousel />
                </Slider>
            </div>
        </div>
    );
}
