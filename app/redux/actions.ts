import { createAsyncThunk } from '@reduxjs/toolkit';
import { callAPI } from '../lib/axios';
import { IFilm } from '../entitys/film';

export const fetchFilms = createAsyncThunk(
  'app/fetch-films',
  async (): Promise<IFilm[]> => {
    const res = await callAPI.get('https://swapi.py4e.com/api/films');
    return res.data.results;
  },
);
