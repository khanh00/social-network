import { httpStatus } from '../constants';
import { AppError } from '../utils';

const validate = (obj) => (req, _, next) => {
  let errorMessage = '';

  Object.keys(obj).forEach((key) => {
    const { error } = obj[`${key}`].validate(req[`${key}`]);
    if (error) {
      errorMessage += error.details.map(({ message }) => message).join(', ');
    }
  });

  if (errorMessage) {
    return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
  }

  return next();
};

export default validate;
