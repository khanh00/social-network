import Joi from 'joi';

const createComment = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

export default createComment;
