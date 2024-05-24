import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useModal } from '../../store';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();
    const { modalOn } = useModal();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password1':
                setPassword1(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
        }
    };

    const cancelHandler = () => {
        navigate('/', { replace: true });
    };

    const FormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password1 !== password2) return modalOn('비밀번호가 일치하지 않습니다.');

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password1)
            .then((auth) => {
                modalOn('회원가입 성공');
                localStorage.setItem('userData', JSON.stringify(auth));
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/weak-password':
                        modalOn('비밀번호가 매우 약합니다. 7자 이상으로 지정하십시오');
                        break;
                    case 'auth/email-already-in-use':
                        modalOn('이미 가입된 이메일 입니다.');
                        break;
                    default:
                        modalOn(`가입 에러 발생 ${error.message}`);
                }
            });
    };

    return (
        <Container>
            <Center>
                <Logo src='/images/apple-gray-logo.svg' alt='logo' />
                <HeadingText>Register with your Email ID</HeadingText>
                <Description>You will be signed in to Apple TV and Apple Music.</Description>
                <Form onSubmit={FormHandler}>
                    <Input onChange={inputHandler} name='email' value={email} required type='email' placeholder='Email ID' />
                    <Input
                        onChange={inputHandler}
                        name='password1'
                        value={password1}
                        required
                        type='password'
                        placeholder='Email password'
                    />
                    <Input
                        onChange={inputHandler}
                        name='password2'
                        value={password2}
                        required
                        type='password'
                        placeholder='Email password Confirm'
                    />
                    <ButtonWrapper>
                        <Button onClick={cancelHandler} type='button'>
                            Back
                        </Button>
                        <Button type='submit'>Register</Button>
                    </ButtonWrapper>
                </Form>
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
    min-width: 200px;
    color: white;
    background-color: transparent;
    border-radius: 0.5rem;
    cursor: pointer;

    &&:hover {
        filter: brightness(0.8);
    }
`;

export default RegisterPage;
