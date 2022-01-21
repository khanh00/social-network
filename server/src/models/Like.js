import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const likeSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
});

export default model('Like', likeSchema);
