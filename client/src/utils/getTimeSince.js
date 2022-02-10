const formatDate = (date) =>
  `${date.getDate().toString().padStart(2, 0)}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, 0)}/${date.getFullYear()}`;

const getTimeSince = (date) => {
  const time = date.getTime();
  const intervalInMinutes = Math.floor((Date.now() - time) / (1000 * 60));

  if (intervalInMinutes < 1) {
    return 'vừa xong';
  }
  if (intervalInMinutes < 60) {
    return `${intervalInMinutes} phút`;
  }
  if (intervalInMinutes < 60 * 24) {
    return `${Math.floor(intervalInMinutes / 60)} giờ`;
  }
  if (intervalInMinutes < 60 * 24 * 7) {
    return `${Math.floor(intervalInMinutes / (60 * 24))} ngày`;
  }
  if (intervalInMinutes < 60 * 24 * 7 * 30) {
    return `${Math.floor(intervalInMinutes / (60 * 24 * 7))} tuần`;
  }

  return formatDate(date);
};

export default getTimeSince;
