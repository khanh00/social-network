import Joi from 'joi';
import { customValidation } from '../utils';

const { objectId } = customValidation;

const createComment = {
  body: Joi.object({
    text: Joi.string().required(),
    post: Joi.string().custom(objectId).required(),
  }),
};

export default { createComment };
