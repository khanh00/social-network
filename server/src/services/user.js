import { User } from '../models';

const getUsers = async () => {
  const user = await User.find().exec();
  return user;
};

const getUser = async (filter) => {
  const user = await User.findOne(filter).select('+password').exec();
  return user;
};

const createUser = async (body) => {
  const { fullName, username, email, password } = body;
  const user = await User.create({ fullName, username, email, password });
  return user;
};

const updateUser = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body, {
    runValidators: true,
  }).exec();
  return user;
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id).exec();
};

export default { getUsers, getUser, createUser, updateUser, deleteUser };
