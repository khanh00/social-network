import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = Schema(
  {
    text: String,
    images: [String],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  },
  {
    timestamps: true,
  }
);

export default model('Post', postSchema);
