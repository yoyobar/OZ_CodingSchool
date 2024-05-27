import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './reducers';

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;
