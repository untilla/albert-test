import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IFilmState } from './types';
import { fetchPersons } from './actions';

const initialState: IFilmState = {
  loading: false,
  loaded: false,
  persons: [],
};

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersons.pending, (state) => {
      state.loading = true;
      state.loaded = false;
    });
    builder.addCase(fetchPersons.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.persons = action.payload;
    });
    builder.addCase(fetchPersons.rejected, (state) => {
      state.loading = false;
      state.loaded = false;
    });
  },
});

export default filmSlice.reducer as Reducer<IFilmState>;
