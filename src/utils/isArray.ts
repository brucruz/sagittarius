const isArray = (arr: any): arr is Array<string> => {
  return !!arr.length;
};

export default isArray;
