import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['search/newSearch'],
        ignoredPaths: ['search.selectedDates'],
      },
    }),
});