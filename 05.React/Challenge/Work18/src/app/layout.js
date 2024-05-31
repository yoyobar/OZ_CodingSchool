import Link from 'next/link';
import './globals.css';

export const metadata = {
    title: '리액트 마지막 과제',
    description: 'OZ코딩스쿨 FE_03 김민수 마지막 과제입니다.',
};

export default function RootLayout({ children }) {
    return (
        <html lang='ko'>
            <body>
                <div className='flex select-none items-center gap-4 bg-black text-white p-2'>
                    <h1 className='text-3xl hover:text-indigo-300 font-bold'>
                        <Link href='/'>HOME</Link>
                    </h1>
                    <Link className='hover:text-indigo-300' href='/read'>
                        POSTS
                    </Link>
                    <Link className='hover:text-indigo-300' href='/create'>
                        CREATE POST
                    </Link>
                </div>
                <div className='select-none'>{children}</div>
            </body>
        </html>
    );
}
