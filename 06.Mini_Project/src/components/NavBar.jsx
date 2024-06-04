import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarButton from './NavBarButton';
import { auth } from '../firebase';

const Header = () => {
    const [modalActive, setModalActive] = useState(false);
    const [search, setSearch] = useState('');
    const { pathname } = useLocation();
    const router = useNavigate();

    const registerHandler = () => {
        router('/register');
    };
    const loginHandler = () => {
        router('/');
    };
    const logoutHandler = () => {
        auth.signOut();
        router('/');
    };

    const inputHandler = (e) => {
        setSearch(e.target.value);
        router(`/search?q=${e.target.value}`);
    };

    return (
        <div className='w-full h-[50px] bg-black text-white flex p-2 justify-between'>
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
            {pathname === '/' || pathname === '/register' ? (
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
            ) : (
                <div className='flex gap-2'>
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
            )}
        </div>
    );
};

export default Header;
