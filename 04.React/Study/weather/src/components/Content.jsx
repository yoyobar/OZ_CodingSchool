import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Content() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: 'slides',
    };
    return (
        <div className='flex justify-center mt-8'>
            <div className='w-8/12'>
                <Slider {...settings}>
                    <div className='bg-slate-50 h-96 p-2 rounded-md'>1</div>
                    <div className='bg-slate-200 h-96'>2</div>
                    <div className='bg-slate-300 h-96'>3</div>
                    <div className='bg-slate-400 h-96'>4</div>
                    <div className='bg-slate-500 h-96'>5</div>
                    <div className='bg-slate-600 h-96'>6</div>
                    <div className='bg-slate-700 h-96'>7</div>
                </Slider>
            </div>
        </div>
    );
}
