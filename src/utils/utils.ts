const pick = (object: {} = {}, keys: any[] = []) => {
  const obj: {} = {};
  if (keys?.length) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < keys.length; index += 1) {
      if (object && Object.prototype.hasOwnProperty.call(object, keys[index])) {
        obj[keys[index]] = object[keys[index]];
      }
    }
  }
  return obj;
};

const difference = (arrays: any[] = []) => arrays
  // eslint-disable-next-line @typescript-eslint/typedef
  .reduce((accumulator, currentValue) => accumulator
    // eslint-disable-next-line @typescript-eslint/typedef
    .filter((value) => !currentValue.includes(value)));

export {
  pick,
  difference,
};
