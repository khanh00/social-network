import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const userSchema = Schema(
  {
    avatar: String,
    imageCover: String,
    fullName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String, select: false },
    passwordResetToken: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function preHook(next) {
  if (!this.username) {
    [this.username] = this.email.split('@');
  }

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

export default model('User', userSchema);
