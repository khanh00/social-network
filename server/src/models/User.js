import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { validator } from '../constants';

const { Schema, model } = mongoose;

const userSchema = Schema({
  avatar: String,
  imageCover: String,
  fullName: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    // sparse: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    require: true,
    validate: validator.email,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  passwordResetToken: String,
});

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
