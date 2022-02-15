import jwt from 'jsonwebtoken';
import { User } from '../models';
import { httpStatus } from '../constants';
import { catchAsync, sendJsonRes } from '../utils';

const { OK, NO_CONTENT } = httpStatus;

const getUsers = catchAsync(async (req, res) => {
  const users = await User.find().exec();
  sendJsonRes(res, OK, { users });
});

const getUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
    .select('+password')
    .exec();
  sendJsonRes(res, OK, { user });
});

const getCurrentUser = catchAsync(async (req, res) => {
  const { id } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  sendJsonRes(res, OK, { user: { _id: id } });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body).exec();
  sendJsonRes(res, OK, { user });
});

const deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id).exec();
  sendJsonRes(res, NO_CONTENT, null);
});

export default { getUsers, getUser, getCurrentUser, updateUser, deleteUser };
