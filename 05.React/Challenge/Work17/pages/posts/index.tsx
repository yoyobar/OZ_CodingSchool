import Header from '@/components/Header';
import posts from '@/utils/posts';
import Link from 'next/link';

const index = ({}) => {
    const postData = Object.values(posts).map((item) => ({
        item,
    }));

    return (
        <>
            <Header />
            {postData.map(({ item }, index) => (
                <div key={item.title} className='flex justify-center'>
                    <div className='mt-4 w-3/6 p-4 border h-[200px]'>
                        <div className='text-3xl font-bold mb-4'>{item.title}</div>
                        <div className='font-mono mb-4'>{item.content}</div>
                        <Link
                            className='bg-indigo-400 hover:bg-indigo-600 p-2 rounded-md text-white transition'
                            href={`posts/post-${index + 1}`}
                        >
                            자세히 보기
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
};

export default index;
