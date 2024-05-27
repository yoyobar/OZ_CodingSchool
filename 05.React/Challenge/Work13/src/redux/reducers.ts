import { createSlice } from '@reduxjs/toolkit';
import { asyncDown, asyncUp } from './action';

interface ActionType {
    payload: number;
    type: string;
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        up: (state, action: ActionType) => {
            state.value = state.value + action.payload;
        },
        down: (state, action: ActionType) => {
            state.value = state.value - action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncUp.fulfilled, (state, action) => {
            state.value += action.payload;
        });
        builder.addCase(asyncDown.fulfilled, (state, action) => {
            state.value -= action.payload;
        });
    },
});

export const { up, down } = counterSlice.actions;
export default counterSlice;
