import { sendJsonRes } from '../utils';

// eslint-disable-next-line no-unused-vars
const handleError = (error, _, res, __) => {
  const { NODE_ENV } = process.env;
  const { message, httpCode = 500, isOperational, stack } = error;

  if (NODE_ENV === 'development') {
    sendJsonRes(res, httpCode, { message, isOperational, stack });
  }

  if (NODE_ENV === 'production') {
    sendJsonRes(res, httpCode, { message });
  }
};

export default handleError;
