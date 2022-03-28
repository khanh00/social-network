import Joi from 'joi';

import { customValidation } from '../utils';

const { objectId } = customValidation;

const createPost = {
  body: Joi.object().keys({
    text: Joi.string(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    text: Joi.string(),
  }),
};

export default { createPost, updatePost };
