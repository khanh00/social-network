import Joi from 'joi';
import { customValidation } from '../utils';

const { objectId } = customValidation;

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    avatar: Joi.string(),
    imageCover: Joi.string(),
    fullName: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

export default { getUser, updateUser, deleteUser };
