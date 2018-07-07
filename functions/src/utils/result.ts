export default class Result<T, E> {
  data: T
  error: E

  constructor(data: T, error: E) {
    this.data = data;
    this.error = error;
  }
}
