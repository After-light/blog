export const pathToKey = (pathName) => {
  return (pathName.split('/') || []).filter((key) => key).join('-');
};
