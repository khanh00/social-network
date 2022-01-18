import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  comment: {
    type: String,
    require: true,
  },
});

export default model('Comment', commentSchema);
