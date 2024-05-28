import { createSlice } from '@reduxjs/toolkit';

export const ALL = 1;
export const COMPLETED = 2;
export const NOT_COMPLETED = 3;

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        view: ALL,
        data: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.data.push({
                id: crypto.randomUUID(),
                text: action.payload,
                completed: false,
            });
        },
        checkTodo: (state, action) => {
            state.data = state.data.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                } else {
                    return {
                        ...item,
                    };
                }
            });
        },
        checkAllTodo: (state) => {
            state.data = state.data.map((item) => {
                return {
                    ...item,
                    completed: true,
                };
            });
        },
        editTodo: (state, action) => {
            state.data = state.data.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        text: action.payload.text,
                    };
                } else {
                    return {
                        ...item,
                    };
                }
            });
        },
        deleteTodo: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        deleteMarkTodo: (state) => {
            state.data = state.data.filter((item) => item.completed !== true);
        },
        filterTodo: (state, action) => {
            state.view = action.payload;
        },
        loadTodo: (state, action) => {
            (state.view = ALL), (state.data = action.payload.data);
        },
    },
});

export const { addTodo, checkTodo, checkAllTodo, editTodo, deleteTodo, deleteMarkTodo, filterTodo, loadTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
