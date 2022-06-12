import { httpStatus } from '../constants';
import { Post, User } from '../models';
import { catchAsync, sendJsonRes } from '../utils';

const { OK, CREATED, NO_CONTENT } = httpStatus;

const getPosts = catchAsync(async (req, res) => {
  const { filter, sort, select } = req.query;
  const posts = await Post.find(filter)
    .sort(sort)
    .select(select)
    .populate('author', 'avatar fullName -_id')
    .populate('likes.like', '-post -__v');
  sendJsonRes(res, OK, { posts });
});

const getPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  sendJsonRes(res, OK, post);
});

const createPost = catchAsync(async (req, res) => {
  const files = [];
  req.files.forEach((file) => {
    files.push({
      src: `${file.destination.split('./public/')[1]}/${file.filename}`,
      typeFile: file.mimetype.split('/')[0],
    });
  });
  const { text } = req.body;
  const { author } = req;
  const newPost = await Post.create({ text, files, author });

  await User.findByIdAndUpdate(author, {
    $addToSet: { posts: newPost._id },
  }).exec();

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
  const { author } = req;
  const { _id } = await Post.findByIdAndDelete(req.params.id);

  await User.findByIdAndUpdate(author, {
    $pull: { posts: _id },
  }).exec();

  sendJsonRes(res, NO_CONTENT, null);
});

export default { getPosts, getPost, createPost, updatePost, deletePost };
