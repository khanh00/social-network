import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = Schema({
  content: String,
  image: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
});

export default model('Post', postSchema);
