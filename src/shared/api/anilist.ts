import axios from 'axios';

export const anilistApi = axios.create({
  baseURL: 'https://graphql.anilist.co',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
