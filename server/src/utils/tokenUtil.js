import jwt from 'jsonwebtoken';

const signToken = (payload) => {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const setCookieToken = (res, token) => {
  const { COOKIE_EXPIRES } = process.env;
  const COOKIE_EXPIRES_IN_MILLISECOND = COOKIE_EXPIRES * 24 * 60 * 60 * 1000;
  res.cookie('token', token, {
    expires: new Date(Date.now() + COOKIE_EXPIRES_IN_MILLISECOND),
    httpOnly: true,
  });
};

const clearCookieToken = (res) => {
  res.clearCookie('token', { httpOnly: true });
};

export default { signToken, setCookieToken, clearCookieToken };
