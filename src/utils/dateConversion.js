const getDateStringFromUnixTime = (unixtime) => {
  return new Date(unixtime * 1000).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};
export default getDateStringFromUnixTime;
