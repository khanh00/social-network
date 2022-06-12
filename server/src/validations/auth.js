import Joi from 'joi';

const signup = {
  body: Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().lowercase().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

export default { signup, login };
