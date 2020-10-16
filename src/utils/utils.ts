/* eslint-disable */
const pick = (object: {} = {}, keys: any[] = []) => {
  const obj: {} = {};
  if (keys?.length) {
    for (let i = 0; i < keys.length; i += 1) {
      if (object && Object.prototype.hasOwnProperty.call(object, keys[i])) {
        obj[keys[i]] = object[keys[i]];
      }
    }
  }
  return obj;
};

const difference = (arrays: any[] = []) => arrays
  .reduce((accumulator, currentValue) => accumulator
    .filter((value) => !currentValue.includes(value)));

export {
  pick,
  difference,
};
