// REMOVE ALL THE PROPERTY FROM OBJ
// THAT DOESN'T INCLUDE IN FIELDS
const filterFields = (obj, fields) => {
  Object.keys(obj).forEach((key) => {
    if (!fields.includes(key)) delete obj[key];
  });

  return obj;
};

export { filterFields };
