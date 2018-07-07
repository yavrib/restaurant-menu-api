export default (collection: Array<object>, query: string, path: string, newObject: object) => {
  const attributes: Array<string> = path.split('.');

  return collection.map(item => {
    const value = attributes.reduce((obj, attribute) => {
      return obj[attribute]
    }, item);

    if (value.toString() === query) {
      return newObject;
    }

    return item;
  });
}
