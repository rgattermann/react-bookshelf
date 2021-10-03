import { configureStore } from '@reduxjs/toolkit';
import books from './books';
import auth from './auth';

const store = configureStore({
  reducer: {
    books,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
