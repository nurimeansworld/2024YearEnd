export const sortCounts = (dataObj) => {
  return Object.entries(dataObj)
    .map(([name, counts]) => ({ name, counts }))
    .sort((a, b) => b.counts - a.counts);
};
