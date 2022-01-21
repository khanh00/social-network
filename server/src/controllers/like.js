import { httpStatus } from '../constants';
import { Like } from '../models';
import { sendJsonRes } from '../utils';

const { OK, CREATED, NO_CONTENT } = httpStatus;

const getLikes = async (_, res) => {
  const likes = await Like.find();
  sendJsonRes(res, OK, likes);
};

const getLike = async (req, res) => {
  const like = await Like.findById(req.params.id);
  sendJsonRes(res, OK, like);
};

const createLike = async (req, res) => {
  const newLike = await Like.create(req.body);
  sendJsonRes(res, CREATED, newLike);
};

const deleteLike = async (req, res) => {
  await Like.findByIdAndDelete(req.params.id);
  sendJsonRes(res, NO_CONTENT, null);
};

export default { getLikes, getLike, createLike, deleteLike };
