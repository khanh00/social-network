import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const likeSchema = Schema({
  type: { type: String, enum: ['like', 'heart', 'laugh', 'surprise', 'tired'] },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

export default model('Like', likeSchema);
