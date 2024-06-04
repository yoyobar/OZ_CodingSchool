import { useBookmark } from '../store';

const MyPage = () => {
    const { mark } = useBookmark();

    if (mark.length === 0)
        return (
            <div className='ml-4 flex flex-col'>
                <div className='text-4xl font-bold text-white '>북마크 목록이 없습니다!</div>
                <button className='bg-slate-500 transition hover:bg-slate-950 text-white p-1 rounded-md w-1/3 mt-6'>돌아가기</button>
            </div>
        );

    return <div>MyPage</div>;
};

export default MyPage;
