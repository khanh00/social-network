import Joi from 'joi';

import { customValidation } from '../utils';

const { objectId } = customValidation;

const updatePost = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    content: Joi.string(),
    images: Joi.array().items(Joi.string()),
    author: Joi.string().custom(objectId).required(),
    comments: Joi.array().items(Joi.string()),
    likes: Joi.array().items(Joi.string()),
  }),
};

export default { updatePost };
