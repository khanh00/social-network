import jwt from 'jsonwebtoken';
import { Comment, User, Post } from '../models';
import { httpStatus } from '../constants';
import { catchAsync, sendJsonRes } from '../utils';

const { OK, CREATED, NO_CONTENT } = httpStatus;

const getComments = catchAsync(async (req, res) => {
  const comments = await Comment.find(req.query)
    .sort('-createdAt')
    .select('-__v')
    .populate('author', 'avatar fullName -_id')
    .exec();
  sendJsonRes(res, OK, { comments });
});

const getComment = catchAsync(async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id });
  sendJsonRes(res, OK, { comment });
});

const createComment = catchAsync(async (req, res) => {
  const { id: author } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const { text, post } = req.body;
  const newComment = await Comment.create({ text, author, post });

  newComment.populate('author', 'avatar fullName -_id');
  await User.findByIdAndUpdate(author, {
    $push: { comments: newComment._id },
  }).exec();
  await Post.findByIdAndUpdate(post, {
    $push: { comments: newComment._id },
  }).exec();

  sendJsonRes(res, CREATED, { comment: newComment });
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);
  sendJsonRes(res, OK, { comment });
});

const deleteComment = catchAsync(async (req, res) => {
  const { _id, author, post } = await Comment.findByIdAndDelete(
    req.params.id
  ).exec();

  await User.findByIdAndUpdate(author, {
    $pull: { comments: _id },
  });
  await Post.findByIdAndUpdate(post, {
    $pull: { comments: _id },
  });

  sendJsonRes(res, NO_CONTENT, null);
});

export default {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
