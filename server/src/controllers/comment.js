import { httpStatus } from '../constants';
import { Comment } from '../models';
import { sendJsonRes } from '../utils';

const { OK, CREATED, NO_CONTENT } = httpStatus;

const getComments = async (_, res) => {
  const comments = await Comment.find();
  sendJsonRes(res, OK, comments);
};

const getComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  sendJsonRes(res, OK, comment);
};

const createComment = async (req, res) => {
  const newComment = await Comment.create(req.body);
  sendJsonRes(res, CREATED, newComment);
};

const updateComment = async (req, res) => {
  const comment = Comment.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  sendJsonRes(res, OK, comment);
};

const deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  sendJsonRes(res, NO_CONTENT, null);
};

export default {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
