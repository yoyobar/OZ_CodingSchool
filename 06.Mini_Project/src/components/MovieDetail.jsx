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
    const router = useNavigate();

    const buttonHandler = () => {
        router(-1);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`movie/${id}`);
            setDetail(response.data);
        }
        fetchData();
    }, [id]);

    if (!detail) return <Loading />;

    return (
        <div className='bg-slate-800 w-full h-full'>
            <div className='w-full h-3/4 p-4 gap-1 flex'>
                <div className='relative h-[400px] rounded-md flex-grow bg-slate-700 lg:h-full'>
                    <button
                        onClick={buttonHandler}
                        className='absolute right-1 top-1 bg-indigo-600 hover:bg-indigo-800 p-2 rounded-md transition text-white'
                    >
                        CLOSE
                    </button>
                    <img className='rounded-md h-full w-full' src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`} />
                    <div className='absolute lg:rounded-md bottom-0 w-full bg-gradient-to-t from-black h-[200px]'></div>
                    <nav className='lg:hidden absolute w-full rounded-b-md bg-slate-700 flex flex-col gap-4'>
                        <DetailTitle {...detail} />
                        <DetailTag genres={detail.genres} />
                        <DetailDes description={detail.overview} />
                    </nav>
                </div>
                <nav className='rounded-md w-[900px] h-full gap-1 flex-col bg-slate-800 hidden lg:flex'>
                    <DetailTitle {...detail} />
                    <DetailTag genres={detail.genres} />
                    <DetailDes description={detail.overview} />
                </nav>
            </div>
        </div>
    );
};

export default MovieDetail;
