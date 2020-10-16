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

const sortObjectKeys = obj =>
  Object.entries(obj)
    .sort()
    .reduce((o, [k, v]) => ((o[k] = v), o), {});

const isEqual = (val1, val2) => {
  if (typeof val1 === "number" && typeof val2 === "number")
    return val1 === val2;
  if (typeof val1 === "string" && typeof val2 === "string")
    return val1 === val2;
  if (Array.isArray(val1) && Array.isArray(val2)) {
    return JSON.stringify(val1) === JSON.stringify(val2);
  }
  if (typeof val1 === "object" && typeof val2 === "object") {
    return (
      JSON.stringify(sortObjectKeys(val1)) ===
      JSON.stringify(sortObjectKeys(val2))
    );
  }
  return false;
};


export {
  pick,
  difference,
  isEqual,
};
