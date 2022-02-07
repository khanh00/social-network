import { sendJsonRes } from '../utils';
import { httpStatus } from '../constants';

// eslint-disable-next-line no-unused-vars
const handleError = (error, _, res, __) => {
  const { NODE_ENV } = process.env;
  const { stack } = error;
  let { message, httpCode = 500, isOperational } = error;

  if (error.code === 11000) {
    const key = Object.keys(error.keyValue)[0];
    const value = Object.values(error.keyValue)[0];

    message = `${key}: "${value}" already exists`;
    httpCode = httpStatus.BAD_REQUEST;
    isOperational = true;
  }

  if (NODE_ENV === 'development') {
    sendJsonRes(res, httpCode, { message, isOperational, stack, error });
  }

  if (NODE_ENV === 'production') {
    sendJsonRes(res, httpCode, { message });
  }
};

export default handleError;
