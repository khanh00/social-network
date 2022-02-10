import getTimeSince from './getTimeSince';

const displayTime = (createdAt, updatedAt) => {
  const dateCreated = new Date(createdAt);
  const dateUpdated = new Date(updatedAt);
  const updated =
    dateCreated.getTime() !== dateUpdated.getTime() ? ' (đã chỉnh sửa)' : '';

  return getTimeSince(dateCreated) + updated;
};

export default displayTime;
