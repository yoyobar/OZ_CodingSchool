import { useEffect, useRef, useState } from 'react';
import { auth } from '../firebase';
import { useBookmark } from '../store';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Loading from '../components/Loading';

const MyPage = () => {
    const { mark, deleteMark } = useBookmark();
    const [userData, setUserData] = useState(null);
    const router = useNavigate();
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef(0);

    const imgHandler = (id) => {
        router(`/main/${id}`);
    };

    const deleteHandler = (e) => {
        deleteMark(e.target.value);
    };

    useEffect(() => {
        setUserData(auth.currentUser);
    }, [mark]);

    useEffect(() => {
        const fetchData = async () => {
            const movieDetails = await Promise.all(
                mark.map(async (id) => {
                    const response = await axios.get(`movie/${id}`);
                    return response.data;
                })
            );
            setMovieData(movieDetails);
            setLoading(false);
        };

        fetchData();
    }, [mark]);

    if (loading) return <Loading />;

    return (
        <div className='ml-4 flex flex-col gap-4 pt-[100px]'>
            <div className='flex gap-2 items-center text-xl font-bold text-white mb-2'>
                <img
                    className='w-[50px] h-[50px] rounded-md'
                    src={userData?.photoURL || 'http://via.placeholder.com/50x50'}
                    alt='User Avatar'
                />
                <div>{userData?.email}, 환영합니다.</div>
            </div>
            <button
                onClick={() => router('/main')}
                className='bg-slate-500 transition hover:bg-slate-950 text-white p-1 rounded-md w-[200px] mt-6'
            >
                돌아가기
            </button>

            {mark.length > 0 ? (
                <div className='relative flex  flex-wrap'>
                    {movieData.map((item) => (
                        <div key={ref.current++} className='relative'>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    imgHandler(item.id);
                                }}
                                className='relative w-full md:w-[300px] rounded-md cursor-pointer flex flex-col justify-center items-center flex-wrap'
                            >
                                <img
                                    className='scale-95 hover:scale-100 rounded-md transition w-full'
                                    src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
                                    alt={item.title}
                                />
                                <div className='text-white'>{item.title}</div>
                            </div>
                            <button
                                onClick={deleteHandler}
                                value={item.id}
                                name={item.title}
                                className='absolute top-2 right-5 text-2xl text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] hover:scale-125 transition'
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-2xl font-mono text-white'>북마크 목록이 없습니다!</div>
            )}
        </div>
    );
};

export default MyPage;
