import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import guestBookReducer from '../services/guestBookSlice';

export const store = configureStore({
  reducer: {
    guestBook: guestBookReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
