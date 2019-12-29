const isEmptyObject = (obj: { hasOwnProperty?: any; }) => {
  for (const key in obj) {
    if (obj.hasOwnProperty.call(key)) return false;
  }
  return true;
};

export default isEmptyObject;
