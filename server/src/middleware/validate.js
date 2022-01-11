import { httpStatus } from '../constants';
import { AppError } from '../utils';

const validate = (obj) => (req, _, next) => {
  let errorMessage = '';

  obj.keys.forEach((schema) => {
    const { error } = schema.validate(req[`${schema}`]);

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
