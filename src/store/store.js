import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice.js';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
