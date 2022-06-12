import Joi from 'joi';

import { customValidation } from '../utils';

const { objectId } = customValidation;

const createPost = {
  body: Joi.object({
    text: Joi.string(),
    files: Joi.array().items(
      Joi.object({
        src: Joi.string(),
        typeFile: Joi.string(),
      })
    ),
  }),
};

const updatePost = {
  params: Joi.object({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object({
    text: Joi.string(),
    files: Joi.array().items(
      Joi.object({
        src: Joi.string(),
        typeFile: Joi.string(),
      })
    ),
  }),
};

export default { createPost, updatePost };
