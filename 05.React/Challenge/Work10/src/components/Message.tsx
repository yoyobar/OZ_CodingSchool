import { useEffect, useState } from 'react';
import { useModal } from '../store';
import styled from 'styled-components';

let timerInterval: null | any = null;
let timer: null | any = null;

const Message = () => {
    const { visible, text, modalClose } = useModal();
    const [indicator, setIndicator] = useState(3000);

    useEffect(() => {
        if (visible) {
            timerInterval = setInterval(() => {
                setIndicator((prev) => prev - 10);
            }, 10);

            timer = setTimeout(() => {
                setIndicator(3000);
                modalClose();
            }, 3000);
        }
        return () => {
            clearInterval(timerInterval);
            clearTimeout(timer);
        };
    }, [visible, modalClose]);

    if (!visible) return;

    return (
        <>
            <AlertContainer>
                <Alert>{text}</Alert>
                <Alertbar style={{ width: `${(indicator / 3000) * 100}%` }}></Alertbar>
            </AlertContainer>
        </>
    );
};

const AlertContainer = styled.div`
    background-color: rgb(7 89 133);
    z-index: 9999;
    min-width: 256px;
    border-radius: 0.375rem;
    padding-top: 0.25rem;
    position: fixed;
    bottom: 2.5rem;
    right: 1.25rem;
`;
const Alert = styled.div`
    padding: 0.5rem;
    color: white;
`;
const Alertbar = styled.div`
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
    height: 0.25rem;
    border-radius: 0.375rem;
    background-color: rgb(74, 222, 128);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    @keyframes pulse {
        50% {
            opacity: 0.5;
        }
    }
`;

export default Message;
