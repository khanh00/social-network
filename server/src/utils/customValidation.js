import mongoose from 'mongoose';

const objectId = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.message(`"${helpers.state.path[0]}" must be an objectId`);
  }
  return value;
};

export default { objectId };
