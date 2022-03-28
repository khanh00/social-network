import { httpStatus } from '../constants';
import { Post } from '../models';
import { catchAsync, sendJsonRes } from '../utils';

const { OK, CREATED, NO_CONTENT } = httpStatus;

const getPosts = catchAsync(async (req, res) => {
  const { filter, sort, select } = req.query;
  const posts = await Post.find(filter)
    .sort(sort)
    .select(select)
    .populate('author', 'avatar fullName -_id')
    .populate('likes', '-post -__v');
  sendJsonRes(res, OK, { posts });
});

const getPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  sendJsonRes(res, OK, post);
});

const createPost = catchAsync(async (req, res) => {
  const images = [];
  req.files.forEach((file) => {
    images.push(`${file.filename}`);
  });
  const { text } = req.body;
  const { author } = req;
  const newPost = await Post.create({ text, images, author });
  sendJsonRes(res, CREATED, { post: newPost });
});

const updatePost = catchAsync(async (req, res) => {
  const post = Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  sendJsonRes(res, CREATED, { post });
});

const deletePost = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  sendJsonRes(res, NO_CONTENT, null);
});

export default { getPosts, getPost, createPost, updatePost, deletePost };
