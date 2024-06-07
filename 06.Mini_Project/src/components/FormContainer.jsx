import { useLocation, useNavigate } from 'react-router-dom';
import Input from './Input';
import { useState } from 'react';
import { createUser, googleUser, loginUser } from '../utils/auth';
import { useModal } from '../store';

const FormContainer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        pw1: '',
        pw2: '',
    });
    const { modalOn } = useModal();

    const backHandler = () => {
        navigate('/');
    };

    const handleGoogleAuth = async () => {
        const result = await googleUser();
        if (!result.status) {
            modalOn(result.data);
        } else {
            navigate('/main');
        }
    };

    const handleLogin = async () => {
        const { id, pw1 } = formData;
        const result = await loginUser(id, pw1);
        if (!result.status) {
            modalOn('잘못된 이메일 또는 비밀번호 입니다.');
        } else {
            navigate('/main');
        }
    };

    const handleRegister = async () => {
        const { id, pw1, pw2 } = formData;
        if (pw1 !== pw2) {
            modalOn('비밀번호가 일치하지 않습니다.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(id)) {
            modalOn('유효하지 않은 이메일 주소입니다.');
            return;
        }
        const result = await createUser(id, pw1);
        if (!result.status) {
            const errorMessageMap = {
                'auth/weak-password': '비밀번호가 너무 짧습니다. 7자 이상으로 해주세요.',
                'auth/email-already-in-use': '이미 가입된 계정 입니다.',
            };
            modalOn(errorMessageMap[result.data] || `가입 에러 발생 : ${result.data}`);
        } else {
            navigate('/main');
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const actionMap = {
            LOGIN: handleLogin,
            REGISTER: handleRegister,
        };
        actionMap[e.target.name]?.();
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name.toLowerCase()]: e.target.value });
    };

    const renderForm = (formType) => (
        <div className='w-full h-full'>
            <div className='w-full flex text-5xl justify-center mb-20 text-white'>THE MOVIE APP</div>
            <form name={formType} onSubmit={submitHandler} className='text-white flex flex-col justify-center items-center gap-4 mt-8'>
                <div className='text-4xl'>{formType === 'LOGIN' ? 'LOGIN' : 'Register'}</div>
                {formType === 'REGISTER' && (
                    <div className='w-1/3'>
                        <div className='text-2xl'>Name</div>
                        <Input onchange={changeHandler} name='NAME' value={formData.name} type='text'>
                            Name...
                        </Input>
                    </div>
                )}
                <div className='w-1/3'>
                    <div className='text-2xl'>ID</div>
                    <Input onchange={changeHandler} name='ID' value={formData.id} type='email'>
                        ID...
                    </Input>
                </div>
                <div className='w-1/3'>
                    <div className='text-2xl'>Password</div>
                    <Input onchange={changeHandler} name='PW1' value={formData.pw1} type='password'>
                        PW...
                    </Input>
                </div>
                {formType === 'REGISTER' && (
                    <div className='w-1/3'>
                        <div className='text-2xl'>Password Confirm</div>
                        <Input onchange={changeHandler} name='PW2' value={formData.pw2} type='password'>
                            PW...
                        </Input>
                    </div>
                )}
                <div className='w-1/3 flex justify-center gap-4'>
                    <button type='submit' className='bg-indigo-400 hover:bg-indigo-600 transition p-2 rounded-md'>
                        {formType === 'LOGIN' ? 'Login' : 'Register'}
                    </button>
                    {formType === 'REGISTER' && (
                        <button type='button' onClick={backHandler} className='bg-red-400 hover:bg-red-600 transition p-2 rounded-md'>
                            Back
                        </button>
                    )}
                </div>
                {formType === 'LOGIN' && (
                    <button className='hover:text-gray-300' type='button' onClick={() => navigate('/register')}>
                        Register New Account
                    </button>
                )}
                <button
                    onClick={handleGoogleAuth}
                    className='mt-10 p-2 rounded-md hover:brightness-125 transition bg-[#782b26] text-white font-mono flex justify-center items-center gap-2'
                >
                    <img className='w-8' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_Plus_logo_%282015-2019%29.svg' />
                    <div>Signup & Login With Google Account</div>
                </button>
            </form>
        </div>
    );

    return pathname === '/' ? renderForm('LOGIN') : renderForm('REGISTER');
};

export default FormContainer;
