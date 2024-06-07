import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarButton from './NavBarButton';
import { auth } from '../firebase';
import BookMarkIcon from '../assets/bookmark.svg?react';

const Header = () => {
    const { pathname } = useLocation();

    return (
        <div className='w-full h-[50px] bg-black text-white flex p-2 justify-between'>
            {pathname === '/' && <UnAuthorizedNav />}
            {pathname === '/register' && <UnAuthorizedNav />}
            {pathname !== '/' && pathname !== '/register' && <AuthorizedNav />}
        </div>
    );
};

export default Header;

const UnAuthorizedNav = () => {
    const [modalActive, setModalActive] = useState(false);
    const router = useNavigate();

    const registerHandler = () => {
        router('/register');
    };
    const loginHandler = () => {
        router('/');
    };

    return (
        <>
            <div className='flex gap-4 justify-center items-center'>
                <img className='w-[25px]' src='/logo.png'></img>
                <div
                    onClick={() => {
                        router('/');
                    }}
                    className='text-xl font-bold cursor-pointer hover:text-gray-400'
                >
                    Movie App
                </div>
            </div>
            <div className='flex gap-2'>
                <button
                    onClick={registerHandler}
                    className='hover:bg-white hover:text-black transition p-2 rounded-md border border-white hidden justify-center items-center lg:flex'
                >
                    Register
                </button>
                <button
                    onClick={loginHandler}
                    className='hover:bg-white hover:text-black transition p-2 rounded-md border border-white hidden justify-center items-center lg:flex'
                >
                    Login
                </button>
                <div
                    onClick={() => {
                        setModalActive(!modalActive);
                    }}
                    className='w-[20px] lg:hidden transition ease-in-out flex flex-col justify-center items-center'
                >
                    {modalActive ? (
                        <>
                            <div className='relative flex flex-col gap-1 justify-center items-center transition '>
                                <div className='absolute rotate-45 w-[20px] h-[3px] bg-white rounded-md transition '></div>
                                <div className='absolute -rotate-45 w-[20px] h-[3px] bg-white rounded-md transition'></div>
                            </div>
                            <NavbarButton />
                        </>
                    ) : (
                        <div className='relative flex flex-col gap-1 justify-center items-center transition'>
                            <div className='w-[20px] h-[3px] bg-white rounded-md transition'></div>
                            <div className='w-[20px] h-[3px] bg-white rounded-md transition'></div>
                            <div className='w-[20px] h-[3px] bg-white rounded-md transition-'></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const AuthorizedNav = () => {
    const [modalActive, setModalActive] = useState(false);
    const [search, setSearch] = useState('');
    const router = useNavigate();

    const logoutHandler = () => {
        auth.signOut();
        router('/');
    };

    const bookmarkHandler = () => {
        router('/my');
    };

    const inputHandler = (e) => {
        setSearch(e.target.value);
        router(`/search?data=${e.target.value}`);
    };
    return (
        <div className='flex justify-between w-full'>
            <div className='flex gap-4 justify-center items-center'>
                <img className='w-[25px]' src='/logo.png'></img>
                <div
                    onClick={() => {
                        router('/');
                    }}
                    className='text-xl font-bold cursor-pointer hover:text-gray-400'
                >
                    Movie App
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <BookMarkIcon onClick={bookmarkHandler} className='fill-white w-8 h-8 cursor-pointer hover:bg-slate-600 rounded-full p-1' />
                <input
                    value={search}
                    onChange={inputHandler}
                    className='p-2 border bg-black rounded-md placeholder:text-gray-200'
                    placeholder='Search...'
                ></input>
                <button
                    onClick={logoutHandler}
                    className='hover:bg-white hover:text-black transition p-2 rounded-md border border-white hidden justify-center items-center lg:flex'
                >
                    Logout
                </button>
                <div
                    onClick={() => {
                        setModalActive(!modalActive);
                    }}
                    className='w-[20px] lg:hidden transition ease-in-out flex flex-col justify-center items-center'
                >
                    {modalActive ? (
                        <>
                            <div className='relative flex flex-col gap-1 justify-center items-center transition '>
                                <div className='absolute rotate-45 w-[20px] h-[3px] bg-white rounded-md transition '></div>
                                <div className='absolute -rotate-45 w-[20px] h-[3px] bg-white rounded-md transition'></div>
                            </div>
                            <NavbarButton />
                        </>
                    ) : (
                        <div className='relative flex flex-col gap-1 justify-center items-center transition'>
                            <div className='w-[20px] h-[3px] bg-white rounded-md transition'></div>
                            <div className='w-[20px] h-[3px] bg-white rounded-md transition'></div>
                            <div className='w-[20px] h-[3px] bg-white rounded-md transition-'></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
