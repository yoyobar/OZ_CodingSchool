import Link from 'next/link';
import './globals.css';
import axios from 'axios';
import { urls } from '/api/urls';
import { Control } from './Control';

export const metadata = {
    title: '리액트 마지막 과제',
    description: 'OZ코딩스쿨 FE_03 김민수 마지막 과제입니다.',
};

export default async function RootLayout({ children }) {
    const res = await axios.get(urls.topics);
    const topics = res.data;

    return (
        <html lang='ko'>
            <body>
                <h1 className='text-3xl font-bold'>
                    <Link href='/'>Test App</Link>
                </h1>
                <ol className='flex flex-col gap-2 border p-1'>
                    {topics.map((topic) => {
                        return (
                            <li key={topic.id}>
                                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
                            </li>
                        );
                    })}
                    {!topics.length && <div>게시글이 없습니다</div>}
                </ol>

                <Control />
                {children}
            </body>
        </html>
    );
}
