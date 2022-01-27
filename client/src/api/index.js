import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});

export const logout = async () => await instance.get('/auth/logout');
export const login = async (data) => await instance.post('/auth/login', data);
