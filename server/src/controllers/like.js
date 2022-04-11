import { httpStatus } from '../constants';
import { Like, Post, User } from '../models';
import { sendJsonRes } from '../utils';

const { OK, CREATED, NO_CONTENT } = httpStatus;

const getLikes = async (req, res) => {
  const likes = await Like.find(req.query.filter);
  sendJsonRes(res, OK, { likes });
};

const getAuthorLikes = async (req, res) => {
  const likes = await Like.find({ ...req.query.filter, author: req.author });
  sendJsonRes(res, OK, { likes });
};

const getLike = async (req, res) => {
  const like = await Like.findById(req.params.id);
  sendJsonRes(res, OK, { like });
};

const createLike = async (req, res) => {
  const { type, post } = req.body;
  const { author } = req;

  const newLike = await Like.create({ type, author, post });

  await User.findByIdAndUpdate(author, {
    $addToSet: { likes: post },
  }).exec();
  await Post.findByIdAndUpdate(post, {
    $addToSet: { likes: author },
  }).exec();

  sendJsonRes(res, CREATED, { like: newLike });
};

const deleteLike = async (req, res) => {
  const { post, author } = await Like.findByIdAndDelete(req.params.id).exec();

  await User.findByIdAndUpdate(author, {
    $pull: { likes: post },
  }).exec();
  await Post.findByIdAndUpdate(post, {
    $pull: { likes: author },
  }).exec();

  sendJsonRes(res, NO_CONTENT, null);
};

export default { getLikes, getAuthorLikes, getLike, createLike, deleteLike };
