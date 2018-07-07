const replaceFirstEncounter = (tail, query, attributes, newObject, head = []) => {
  const [ first, ...rest ] = tail;

  if (!first) {
    return;
  }

  const value = attributes.reduce((obj, attribute) => {
    return obj[attribute]
  }, first);

  if (value.toString() === query) {
    return [ ...head, newObject, ...rest ];
  }

  return replaceFirstEncounter(rest, query, attributes, newObject, [...head, first])
}

export default (collection: Array<object>, query: string, path: string, newObject: object) => {
  const attributes: Array<string> = path.split('.');

  return replaceFirstEncounter(collection, query, attributes, newObject);
}
