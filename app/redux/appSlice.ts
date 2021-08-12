import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IAppState } from './types';
import { fetchFilms } from './actions';

const initialState: IAppState = {
  loading: false,
  loaded: false,
  films: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.films = action.payload;
    });
    builder.addCase(fetchFilms.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default appSlice.reducer as Reducer<IAppState>;
