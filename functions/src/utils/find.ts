const find = (collection: Array<object>, query: string, attributes: Array<string>) => {
  if (collection.length === 0) {
    return false;
  }

  const [ first, ...rest ] = collection;

  const value = attributes.reduce((obj, attribute) => {
    return obj[attribute];
  }, first);

  if (value.toString() === query) {
    return first;
  }

  return find(rest, query, attributes);
}

export default (collection: Array<object>, query: string, path: string, result: object = {}) => {
  const attributes: Array<string> = path.split('.');

  const found = find(collection, query, attributes)

  return Object.keys(found).length > 0 ? found : result;
}

/*
export default (origin: object, query: string, path: string, result: object = {}) => {
  const attributes: Array<string> = path.split('.');

  const value = attributes.reduce((obj, attribute) => (
    obj = obj[attribute], obj
  ), origin);

  if (value.toString() === query) {
    return origin;
  }

  return result;
}
*/
