import { createAsyncThunk } from '@reduxjs/toolkit';
import { callAPI } from '../../lib/axios';
import { IPerson } from '../../entitys/person';

export const fetchPersons = createAsyncThunk(
  'film/fetch-persons',
  async (links: string[]): Promise<IPerson[]> => {
    const results = await Promise.all(links.map((link) => callAPI.get(link)));
    return results.map((res) => res.data);
  },
);
