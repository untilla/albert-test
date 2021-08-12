import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import filmReducer from '../screens/FilmDetails/filmSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    film: filmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
