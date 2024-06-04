import { useLocation, useNavigate } from 'react-router-dom';
import Input from './Input';
import { useState } from 'react';
import { createUser, googleUser, loginUser } from '../utils/auth';
import { useModal } from '../store';

const FormContainer = () => {
    const { pathname } = useLocation();
    const router = useNavigate();
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [pw1, setPw1] = useState('');
    const [pw2, setPw2] = useState('');
    const { modalOn } = useModal();

    const backHandler = () => {
        router('/');
    };

    const handleGoogleAuth = async () => {
        const result = await googleUser();

        if (result.status === false) {
            modalOn(result.data);
        } else {
            router('/main');
        }
    };

    const handleLogin = async () => {
        const result = await loginUser(id, pw1);
        if (result.status === false) {
            modalOn('잘못된 이메일 또는 비밀번호 입니다.');
        }
    };

    const handleRegister = async () => {
        if (pw1.trim() !== pw2.trim()) return modalOn('비밀번호가 일치하지 않습니다.');

        const result = await createUser(id, pw1);
        if (result.status === false) {
            switch (result.data) {
                case 'auth/weak-password':
                    modalOn('비밀번호가 너무 짧습니다. 7자 이상으로 해주세요.');
                    break;
                case 'auth/email-already-in-use':
                    modalOn('이미 가입된 계정 입니다.');
                    break;
                default:
                    modalOn(`가입 에러 발생 : ${result.data}`);
            }
        } else {
            router('/main');
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        switch (e.target.name) {
            case 'LOGIN':
                handleLogin();
                break;
            case 'REGISTER':
                handleRegister();
                break;
        }
    };

    const changeHandler = (e) => {
        switch (e.target.name) {
            case 'NAME':
                setName(e.target.value);
                break;
            case 'ID':
                setId(e.target.value);
                break;
            case 'PW1':
                setPw1(e.target.value);
                break;
            case 'PW2':
                setPw2(e.target.value);
                break;
        }
    };

    switch (pathname) {
        case '/':
            return (
                <div className='w-full h-full'>
                    <div className='w-full flex text-5xl justify-center mb-20 text-white'>THE MOVIE APP</div>
                    <form
                        name='LOGIN'
                        onSubmit={submitHandler}
                        className=' text-white flex flex-col justify-center items-center gap-4 mt-8'
                    >
                        <div className='text-4xl'>LOGIN</div>

                        <div className='w-1/3'>
                            <div className='text-2xl '>ID</div>
                            <Input onchange={changeHandler} name='ID' value={name} type='text'>
                                ID...
                            </Input>
                        </div>
                        <div className='w-1/3'>
                            <div className='text-2xl '>Password</div>
                            <Input onchange={changeHandler} name='PW1' value={pw1} type='password'>
                                PW...
                            </Input>
                        </div>
                        <div className='w-1/3 flex justify-center gap-4'>
                            <button type='submit' className='bg-indigo-400 hover:bg-indigo-600 transition p-2 rounded-md'>
                                Login
                            </button>
                        </div>
                        <button
                            className='hover:text-gray-300'
                            type='button'
                            onClick={() => {
                                router('/register');
                            }}
                        >
                            Register New Account
                        </button>
                        <button
                            onClick={handleGoogleAuth}
                            className='mt-10 p-2 rounded-md hover:brightness-125 transition bg-[#782b26] text-white font-mono flex justify-center items-center gap-2'
                        >
                            <img
                                className='w-8'
                                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_Plus_logo_%282015-2019%29.svg'
                            />
                            <div>Signup & Login With Google Account</div>
                        </button>
                    </form>
                </div>
            );
        case '/register':
            return (
                <div className='w-full h-full'>
                    <div className='w-full flex text-5xl justify-center mb-20 text-white'>THE MOVIE APP</div>
                    <form
                        name='REGISTER'
                        onSubmit={submitHandler}
                        className=' text-white flex flex-col justify-center items-center gap-4 mt-8'
                    >
                        <div className='text-4xl'>Register</div>

                        <div className='w-1/3'>
                            <div className='text-2xl '>Name</div>
                            <Input onchange={changeHandler} name='NAME' value={id} type='text'>
                                Name...
                            </Input>
                        </div>

                        <div className='w-1/3'>
                            <div className='text-2xl '>ID</div>
                            <Input onchange={changeHandler} name='ID' value={id} type='email'>
                                ID...
                            </Input>
                        </div>
                        <div className='w-1/3'>
                            <div className='text-2xl '>Password</div>
                            <Input onchange={changeHandler} name='PW1' value={pw1} type='password'>
                                PW...
                            </Input>
                        </div>
                        <div className='w-1/3'>
                            <div className='text-2xl '>Password Confirm</div>
                            <Input onchange={changeHandler} name='PW2' value={pw2} type='password'>
                                PW...
                            </Input>
                        </div>
                        <div className='w-1/3 flex justify-center gap-4'>
                            <button type='submit' className='bg-indigo-400 hover:bg-indigo-600 transition p-2 rounded-md'>
                                Register
                            </button>
                            <button type='button' onClick={backHandler} className='bg-red-400 hover:bg-red-600 transition p-2 rounded-md'>
                                Back
                            </button>
                        </div>
                        <button
                            onClick={handleGoogleAuth}
                            className='mt-10 p-2 rounded-md hover:brightness-125 transition bg-[#782b26] text-white font-mono flex justify-center items-center gap-2'
                        >
                            <img
                                className='w-8'
                                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_Plus_logo_%282015-2019%29.svg'
                            />
                            <div>Signup & Login With Google Account</div>
                        </button>
                    </form>
                </div>
            );
    }
};

export default FormContainer;
