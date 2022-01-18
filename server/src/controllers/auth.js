import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { httpStatus } from '../constants';
import { catchAsync, AppError, sendJsonRes, authUtil } from '../utils';
import { userService } from '../services';

const { OK, CREATED, UNAUTHORIZED } = httpStatus;

const signup = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = authUtil.signToken({ id: user._id });

  authUtil.setCookieToken(res, token);
  sendJsonRes(res, CREATED, { token, user });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.getUser({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError(UNAUTHORIZED, 'Email hoặc mật khẩu không chính xác')
    );
  }

  const token = authUtil.signToken({ id: user._id });

  authUtil.setCookieToken(res, token);
  return sendJsonRes(res, OK, { token, user });
});

const logout = catchAsync((_, res) => {
  sendJsonRes(res, OK).clearCookie('token');
});

const checkIfLogin = catchAsync(async (req, _, next) => {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError(UNAUTHORIZED, 'Đăng nhập để truy cập'));
  }

  const { id } = jwt.verify(token, JWT_SECRET, { maxAge: JWT_EXPIRES_IN });
  const user = userService.getUser(id);

  if (!user) {
    return next(new AppError(UNAUTHORIZED, 'Phiên đăng nhập đã hết hạng'));
  }

  return next();
});

export default { signup, login, logout, checkIfLogin };
