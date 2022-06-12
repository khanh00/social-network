import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = Schema(
  {
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  {
    timestamps: true,
  }
);

export default model('Comment', commentSchema);
