import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './todoSlice';

const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

store.subscribe(() => {
    const todoState = store.getState().todo;
    localStorage.setItem('todo', JSON.stringify(todoState));
});

export default store;
