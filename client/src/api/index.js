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

// Post
export const getPosts = catchAsync(() => instance.get('/posts'));
export const createPost = catchAsync((data) => instance.post('/posts', data));

// Comment
export const getComments = catchAsync((queryString) =>
  instance.get(`/comments?${queryString}`)
);
export const createComment = catchAsync((data) =>
  instance.post('/comments', data)
);

// Like
export const getLikes = catchAsync(() => instance.get('/likes'));
export const createLike = catchAsync((data) => instance.post('/likes', data));
export const deleteLike = catchAsync((id) => instance.delete(`/likes/${id}`));
