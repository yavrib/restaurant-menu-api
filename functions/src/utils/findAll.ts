export default (collection: Array<object>, query: string, path: string, result: object = {}): any => {
  const attributes: Array<string> = path.split('.');

  return collection.filter(item => {
    const value = attributes.reduce((obj, attribute) => {
      return obj[attribute]
    }, item);

    return value.toString() === query;
  });
}
