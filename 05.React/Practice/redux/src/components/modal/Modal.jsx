import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL } from '../../reducer';
import { ModalWrapper } from './Modal.style';

function Modal() {
    const isShow = useSelector((state) => state.modal.isShow);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL });
    };

    if (!isShow) return null;

    return (
        <ModalWrapper>
            <div className='container'>
                <div className='header'>
                    <h1>제목</h1>
                    <button onClick={closeModal}>닫기</button>
                </div>
                <p>내용</p>
            </div>
        </ModalWrapper>
    );
}

export default Modal;
