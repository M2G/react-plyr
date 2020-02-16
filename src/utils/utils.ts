const pick = (object: {} = {}, keys :any[] = []) => {
  const obj :{} = {};
  if (keys?.length) {
    for (let index = 0; index < keys.length; index += 1) {
      if (object && Object.prototype.hasOwnProperty.call(object, keys[index])) {
        obj[keys[index]] = object[keys[index]];
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
