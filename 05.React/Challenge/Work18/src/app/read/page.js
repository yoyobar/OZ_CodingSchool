import axios from 'axios';
import { urls } from '../../../api/urls';
import Link from 'next/link';
export default async function Reads() {
    const res = await axios.get(urls.topics);
    const topics = res.data;

    return (
        <article className='flex flex-col gap-2 border p-1 text-black'>
            <div className='w-full p-2 font-bold text-xl rounded-md'>게시글 목록</div>
            <div className='w-full p-4 flex justify-center flex-wrap gap-5 '>
                {topics.map((topic) => {
                    const truncatedBody = topic.body.length > 32 ? topic.body.slice(0, 32) + '...' : topic.body;

                    return (
                        <Link className='w-[30%]' href={`/read/${topic.id}`}>
                            <div className='h-[120px] border p-2 rounded-md hover:bg-slate-100 hover:scale-105 transition ' key={topic.id}>
                                <div className='flex flex-col'>
                                    <div className='text-2xl mb-1 font-bold'>{topic.title}</div>
                                    <div className='hidden md:block mb-4'>{truncatedBody}</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {!topics.length && <div>게시글이 없습니다</div>}
        </article>
    );
}
