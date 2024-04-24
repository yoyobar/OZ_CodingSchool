import { useEffect, useRef, useReducer } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Items from './components/Items';

//dispatch
function reducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [...state, action.data];
        case 'DELETE':
            return state.filter((item) => item.id !== action.targetId);
        case 'UPDATE':
            return state.map((item) => {
                if (item.id === action.targetId) {
                    return {
                        ...item,
                        checked: !item.checked,
                    };
                } else {
                    return item;
                }
            });
        case 'LOAD':
            return action.data;
        default:
            return state;
    }
}

function App() {
    const [todo, dispatch] = useReducer(reducer, []);
    const state = useRef(false);

    //localStorage save
    useEffect(() => {
        if (state.current) {
            const saveData = JSON.stringify(todo);
            localStorage.setItem('todo', saveData);
        }
        state.current = true;
    }, [todo]);

    //localStorage load
    useEffect(() => {
        const loadData = JSON.parse(localStorage.getItem('todo'));
        if (loadData) {
            dispatch({
                type: 'LOAD',
                data: loadData,
            });
        }
    }, []);

    //todo 생성, id: 날짜 / createData: 날짜 string화 / content: input데이터 / checked: 박스데이터
    const todoCreate = (date, content) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: new Date().getTime(),
                createDate: date,
                content: content,
                checked: false,
            },
        });
    };

    //todo 체크박스 관리
    const todoUpdate = (id) => {
        dispatch({
            type: 'UPDATE',
            targetId: id,
        });
    };

    //todo 삭제 관리
    const todoDelete = (id) => {
        dispatch({
            type: 'DELETE',
            targetId: id,
        });
    };

    return (
        <div className='border-2 border-slate-700'>
            <Header />
            <Items todo={todo} todoUpdate={todoUpdate} todoDelete={todoDelete} />
            <Footer todoCreate={todoCreate} />
        </div>
    );
}

export default App;
