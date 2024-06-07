import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useBookmark } from '../store';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const { mark } = useBookmark();
    const [userData, setUserData] = useState(null);
    const router = useNavigate();

    useEffect(() => {
        setUserData(auth.currentUser);
    }, [userData]);

    if (mark.length === 0)
        return (
            <div className='ml-4 flex flex-col gap-4 pt-[100px]'>
                <div className='flex gap-2 items-center text-xl font-bold text-white mb-2'>
                    <img className='w-[50px] h-[50px] rounded-md' src={userData?.photoURL} />
                    <div>{userData?.email}, 환영합니다.</div>
                </div>

                <div className='w-1/3 rounded-sm bg-slate-200 p-2'>북마크 정보</div>
                <div className='text-4xl font-bold text-white '>북마크 목록이 없습니다!</div>
                <button
                    onClick={() => router('/main')}
                    className='bg-slate-500 transition hover:bg-slate-950 text-white p-1 rounded-md w-1/3 mt-6'
                >
                    돌아가기
                </button>
            </div>
        );

    return <div>MyPage</div>;
};

export default MyPage;
