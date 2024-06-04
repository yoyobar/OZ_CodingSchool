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
        <>
            <div onClick={buttonHandler} className='w-full bg-black h-[calc(100%-40px)] absolute top-10 left-0 z-30 opacity-45'></div>
            <div onClick={buttonHandler} className='text-white cursor-pointer absolute text-3xl font-bold right-6 top-16 z-40'>
                X
            </div>
            <div className='w-full h-full relative z-40 mt-4'>
                <div className='w-full h-full p-4 gap-1 flex'>
                    <div className='relative rounded-md bg-slate-700 lg:h-full'>
                        <img
                            className='rounded-md min-h-[500px] h-full w-full'
                            src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                            alt={detail.title}
                        />
                        <div className='absolute bottom-0 w-full bg-gradient-to-t from-black h-[200px]'></div>
                        <nav className='lg:hidden absolute w-full bg-slate-700 flex flex-col gap-4 p-4'>
                            <DetailTitle {...detail} />
                            <DetailTag genres={detail.genres} />
                            <DetailDes description={detail.overview} />
                        </nav>
                    </div>
                    <nav className='hidden lg:flex flex-col gap-1 bg-slate-700 w-[1200px] min-h-[500px] rounded-md p-4'>
                        <DetailTitle {...detail} />
                        <DetailTag genres={detail.genres} />
                        <DetailDes description={detail.overview} />
                    </nav>
                </div>
            </div>
        </>
    );
};

export default MovieDetail;
