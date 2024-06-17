import { useState } from 'react';
import './ButtonContainer.css';
import Modal from './Modal';

const ButtonContainer = ({ createTodo }) => {
    const [isVisible, setIsVisible] = useState(false);

    const modalHandler = () => {
        setIsVisible((prev) => !prev);
    };
    return (
        <div className='button-container'>
            <button onClick={modalHandler}>Todo 생성하기</button>
            {isVisible && <Modal modalOn={modalHandler} createTodo={createTodo} />}
        </div>
    );
};

export default ButtonContainer;
