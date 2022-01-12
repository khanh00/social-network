import { httpStatus } from '../constants';
import { userService } from '../services';
import { catchAsync, sendJsonRes } from '../utils';

const { OK, NO_CONTENT } = httpStatus;

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  sendJsonRes(res, OK, { users });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUser(req.params.id);
  sendJsonRes(res, OK, { user });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  sendJsonRes(res, OK, { user });
});

const deleteUser = catchAsync(async (req, res) => {
  userService.deleteUser(req.params.id);
  sendJsonRes(res, NO_CONTENT);
});

export default { getUsers, getUser, updateUser, deleteUser };
