import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import app from '../firebase';

const Logo = styled.div`
    width: 70px;
    font-size: 0;
    display: inline-block;
    margin-bottom: 10px;
    cursor: pointer;

    img {
        display: block;
        width: 100%;
    }
`;

const NavWrapper = styled.div<NavWrapperProps>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
    transition: all 0.3s;
    opacity: ${(props) => (props.show === 'true' ? '0.7' : '1')};
`;

const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: 1px solid lightgray;

    &&:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    transition: all 0.2s ease;
    cursor: pointer;

    &&:hover {
        background-color: white;
        color: black;
    }
`;

interface NavWrapperProps {
    show: string;
}

const initialUserData = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;

const Nav = () => {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [userData, setUserData] = useState<User | null>(initialUserData as unknown as User);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const handleAuth = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUserData(result.user);
                localStorage.setItem('userData', JSON.stringify(result.user));
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleLogout = () => {
        signOut(auth);
        localStorage.removeItem('userData');
    };

    const listener = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user && pathname !== '/register') {
                navigate('/');
            } else if (user && pathname === '/') {
                navigate('/main');
            }

            if (userData === null) {
                navigate('/');
            }
        });
    }, [auth, navigate]);

    useEffect(() => {
        window.addEventListener('scroll', listener);
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, []);

    return (
        <NavWrapper show={String(show)}>
            <Logo>
                <img alt='logo' src='/images/apple-logo.png' onClick={() => (window.location.href = '/')} />
            </Logo>
            {pathname === '/' || pathname === '/register' ? (
                <Login onClick={handleAuth}>로그인</Login>
            ) : (
                <>
                    <Login onClick={handleLogout}>로그아웃</Login>
                    <Input
                        onChange={handleChange}
                        value={searchValue}
                        type='text'
                        className='nav__input'
                        placeholder='영화를 검색해주세요.'
                    ></Input>
                </>
            )}
        </NavWrapper>
    );
};

export default Nav;
