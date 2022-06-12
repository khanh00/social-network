import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { httpStatus } from '../constants';
import { catchAsync, AppError, sendJsonRes, tokenUtil } from '../utils';
import { User } from '../models';

const { OK, CREATED, UNAUTHORIZED } = httpStatus;
const { signToken, setCookieToken, clearCookieToken } = tokenUtil;

const signup = catchAsync(async (req, res) => {
  const { fullName, username, email, password } = req.body;
  const user = await User.create({
    fullName,
    username,
    email,
    password,
  });
  const token = signToken({ id: user._id });

  setCookieToken(res, token);
  sendJsonRes(res, CREATED, { token, user });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(UNAUTHORIZED, 'Email hoặc mật khẩu không chính xác'));
  }

  const token = signToken({ id: user._id });

  setCookieToken(res, token);
  return sendJsonRes(res, OK, { token, user });
});

const logout = catchAsync((_, res) => {
  clearCookieToken(res);
  sendJsonRes(res, OK);
});

const checkIfLoggedIn = catchAsync(async (req, _, next) => {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError(UNAUTHORIZED, 'Đăng nhập để truy cập'));
  }

  const { id } = jwt.verify(token, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const user = await User.findOne({ _id: id });

  if (!user) {
    return next(new AppError(UNAUTHORIZED, 'Phiên đăng nhập đã hết hạn'));
  }

  req.author = id;
  return next();
});

export default { signup, login, logout, checkIfLoggedIn };
