import Result from "../utils/result";

export default interface BaseService<T> {
  getAll(): Result<Array<T>, string>

  getOne(id: string): Result<T, string>

  create(body: T): Result<T, string>

  update(id: string, body: T): Result<T, string>

  remove(id: string): Result<T, string>
}
