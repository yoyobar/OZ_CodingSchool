import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    transition: all 1s;
    opacity: ${(props) => (props.show === 'true' ? '0.9' : '0.5')};
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
`;

interface NavWrapperProps {
    show: string;
}

const Nav = () => {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

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
            <Login>로그인</Login>
            <Input
                onChange={handleChange}
                value={searchValue}
                type='text'
                className='nav__input'
                placeholder='영화를 검색해주세요.'
            ></Input>
        </NavWrapper>
    );
};

export default Nav;
