import { createAsyncThunk } from '@reduxjs/toolkit';

export const asyncUp = createAsyncThunk('counter/asyncUp', async (amount: number) => {
    return new Promise<number>((resolve) => {
        setTimeout(() => {
            resolve(amount);
        }, 1000);
    });
});
export const asyncDown = createAsyncThunk('counter/asyncDown', async (amount: number) => {
    return new Promise<number>((resolve) => {
        setTimeout(() => {
            resolve(amount);
        }, 1000);
    });
});
