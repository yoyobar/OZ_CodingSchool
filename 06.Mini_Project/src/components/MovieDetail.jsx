import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import DetailDes from './DetailDes';
import DetailTag from './DetailTag';
import DetailTitle from './DetailTitle';
import Loading from './Loading';

const MovieDetail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState('');
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const router = useNavigate();

    const buttonHandler = () => {
        router(-1);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`movie/${id}`);
            setDetail(response.data);
            setLoading(false);
        }

        fetchData();
    }, [id]);

    if (loading) return <Loading />;

    return (
        <div>
            <div onClick={buttonHandler} className='text-white cursor-pointer absolute text-3xl font-bold right-6 top-16 z-40'>
                X
            </div>
            <div className='relative mt-10 justify-center '>
                <div className='rounded-md flex justify-center flex-col max-h-[1080px]'>
                    <nav className='rounded-md lg:flex flex-col max-h-[1080px]'>
                        <img
                            className='rounded-md max-h-[1080px]'
                            src={`${imageLoading ? 'http://via.placeholder.com/1920x1080' : `https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}`}
                            alt={detail.title}
                            onLoad={() => {
                                setImageLoading(false);
                            }}
                        />
                    </nav>
                </div>
                <nav className='w-full bg-gradient-to-t rounded-b-md from-black to-transparent flex flex-col gap-4 p-4 lg:absolute lg:bottom-0'>
                    <DetailTitle {...detail} />
                    <DetailTag genres={detail.genres} />
                    <DetailDes description={detail.overview} />
                </nav>
            </div>
        </div>
    );
};

export default MovieDetail;
