import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const linkHandler = () => {
        navigate('/register');
    };

    return (
        <Container>
            <Center>
                <Logo src='/images/apple-gray-logo.svg' alt='logo' />
                <HeadingText>Login with your Email ID</HeadingText>
                <Description>You will be signed in to Apple TV and Apple Music.</Description>
                <Form>
                    <Input required type='email' placeholder='Email ID' />
                    <Input required type='password' placeholder='Email password' />
                    <ButtonWrapper>
                        <Button type='submit'>Login</Button>
                    </ButtonWrapper>
                </Form>

                <LinkText onClick={linkHandler}>Create New Apple ID</LinkText>
            </Center>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Center = styled.div`
    max-width: 650px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Logo = styled.img`
    margin-bottom: 1.3rem;
    width: 50px;
`;
const HeadingText = styled.h1`
    font-size: 1.9rem;
`;
const Description = styled.p`
    margin: 0;
    font-size: 1.3rem;
`;
const LinkText = styled.p`
    font-size: 1.2rem;
    color: #2997ff;
    margin: 1rem 0;
    cursor: pointer;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    margin-top: 2.5rem;
    font-size: 18px;
    padding: 1rem;
    border: 1px solid transparent;
    border-radius: 12px;
    border-color: #424245;
    background-color: hsla(0, 0%, 100%, 0.04);
    width: 310px;
    font-weight: 400;
    cursor: pointer;
    color: white;

    &&:hover {
        background-color: hsla(0, 0%, 100%, 0.08);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;
`;

const Button = styled.button`
    padding: 1rem;
    margin-top: 2rem;
    margin-bottom: 4rem;
    border: 1px solid #f9f9f9;
    color: white;
    background-color: transparent;
    border-radius: 0.5rem;
    cursor: pointer;

    &&:hover {
        filter: brightness(0.8);
    }
`;
export default LoginPage;
