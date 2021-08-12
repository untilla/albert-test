import axios, { AxiosInstance } from 'axios';

export const callAPI: AxiosInstance = axios.create({
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
    },
  },
});
