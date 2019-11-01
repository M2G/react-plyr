function isEmptyObject(obj: { hasOwnProperty?: any; }) {
  // eslint-disable-next-line no-restricted-syntax
  for(const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export default isEmptyObject;
