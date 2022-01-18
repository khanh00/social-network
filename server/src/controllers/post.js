import { httpStatus } from '../constants';
import { Post } from '../models';
import { sendJsonRes } from '../utils';

const { OK, CREATED, NO_CONTENT } = httpStatus;

const getPosts = async (_, res) => {
  const posts = await Post.find();
  sendJsonRes(res, OK, posts);
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  sendJsonRes(res, OK, post);
};

const createPost = async (req, res) => {
  const newPost = await Post.create(req.body);
  sendJsonRes(res, CREATED, newPost);
};

const updatePost = async (req, res) => {
  const post = Post.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  sendJsonRes(res, CREATED, post);
};

const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  sendJsonRes(res, NO_CONTENT, null);
};

export default { getPosts, getPost, createPost, updatePost, deletePost };
