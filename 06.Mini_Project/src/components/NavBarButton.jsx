import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const NavbarButton = () => {
    const router = useNavigate();
    const { pathname } = useLocation();

    const loginHandler = () => {
        router('/');
    };

    const registerHandler = () => {
        router('/register');
    };

    const logoutHandler = () => {
        auth.signOut();
        router('/');
    };

    return pathname === '/' ? (
        <div className='absolute z-50 flex flex-col gap-1 top-14 right-2 p-1 rounded-md bg-black text-white'>
            <button onClick={loginHandler} className='hover:bg-white hover:text-black rounded-md text-2xl'>
                Login
            </button>
            <button onClick={registerHandler} className='hover:bg-white hover:text-black rounded-md text-2xl'>
                Register
            </button>
        </div>
    ) : (
        <div
            onClick={logoutHandler}
            className='hover:bg-white hover:text-black absolute z-50 flex flex-col p-1 gap-1 top-14 right-2 rounded-md bg-black text-white'
        >
            <button className='rounded-md text-2xl'>Logout</button>
        </div>
    );
};

export default NavbarButton;
