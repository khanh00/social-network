import getTimeSince from './getTimeSince';

// eslint-disable-next-line no-unused-vars
const displayTime = (createdAt, updatedAt) => {
  const dateCreated = new Date(createdAt);
  // const dateUpdated = new Date(updatedAt);
  // const updated =
  //   dateCreated.getTime() !== dateUpdated.getTime() ? ' (đã chỉnh sửa)' : '';

  // return getTimeSince(dateCreated) + updated;
  return getTimeSince(dateCreated);
};

export default displayTime;
