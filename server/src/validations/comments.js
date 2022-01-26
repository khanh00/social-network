import Joi from 'joi';
import { customValidation } from '../utils';

const { objectId } = customValidation;

const createComment = {
  body: Joi.object().keys({
    author: Joi.string().custom(objectId).required(),
    post: Joi.string().custom(objectId).required(),
    content: Joi.string().required(),
  }),
};

export default createComment;
