
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/bookSlice.js';

const store = configureStore({
  reducer: {
    app: booksReducer,
  },
});

export default store;