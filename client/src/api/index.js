import axios from 'axios';
import catchAsync from '../utils/catchAsync';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER + '/api',
  withCredentials: true,
});

// Auth
export const logout = catchAsync(() => instance.get('/auth/logout'));
export const login = catchAsync((data) => instance.post('/auth/login', data));

// User
export const getCurrentUser = catchAsync(() => instance.get('/users/me'));
export const getUsers = catchAsync((queryString) => instance.get(`/users?${queryString}`));
export const updateUser = catchAsync((id, data) => instance.patch(`/users/${id}`, data));

// Post
export const getPosts = catchAsync(() => instance.get('/posts'));
export const createPost = catchAsync((data) => instance.post('/posts', data));

// Comment
export const getComments = catchAsync((queryString) => instance.get(`/comments?${queryString}`));
export const createComment = catchAsync((data) => instance.post('/comments', data));

// Like
export const getLikes = catchAsync((queryString) => instance.get(`/likes?${queryString}`));
export const getAuthorLikes = catchAsync((queryString) => instance.get(`/likes/me?${queryString}`));
export const createLike = catchAsync((data) => instance.post('/likes', data));
export const deleteLike = catchAsync((id) => instance.delete(`/likes/${id}`));
