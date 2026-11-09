import axios from 'axios';

export const jikanApi = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 10000,
});
