import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
//? useSelector state 값 가져오기
//? useDispatch 액션

const Form = ({ text, setText }) => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() !== '') {
            dispatch(addTodo(text));
            setText('');
        }
    };
    return (
        <form className='w-full border-b relative' onSubmit={handleSubmit}>
            <input
                className='w-full p-2'
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
                placeholder='무엇을 추가할까요?'
            />
            <div className='absolute top-[8px] right-2 text-[rgba(0,0,0,0.5)]'>⏎ Enter</div>
        </form>
    );
};

export default Form;
