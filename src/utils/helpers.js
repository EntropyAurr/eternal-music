export const formatDuration = (value) => {
  const min = Math.floor(value / 60);
  const sec = value % 60;

  return `0${min}:${sec < 10 ? "0" : ""}${sec}`;
};
