import Link from 'next/link';
import { usePathname } from 'next/navigation';

enum ActiveType {
    HOME = '/',
    POSTS = '/posts',
}

const Header = () => {
    const path = usePathname();

    return (
        <>
            <nav className='w-full h-[100px] bg-slate-950 flex gap-[100px] pl-[100px] items-center'>
                <Link
                    className={`${path === ActiveType.HOME && 'text-orange-400'} text-white text-2xl font-bold hover:text-orange-400`}
                    href='/'
                >
                    Home
                </Link>
                <Link
                    className={`${path === ActiveType.POSTS && 'text-orange-400'} text-white text-2xl font-bold hover:text-orange-400`}
                    href='/posts'
                >
                    Posts
                </Link>
            </nav>
        </>
    );
};

export default Header;
