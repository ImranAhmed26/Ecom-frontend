export const formatDate = (date, options = {}) => {
  const { day = true } = options;
  const str = new Date(date).toDateString().split(" ");
  return `${str[1]} ${str[2]}, ${str[3]}`;
};
