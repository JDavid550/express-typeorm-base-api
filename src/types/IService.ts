export interface IService<T> {
  getById(id: number): Promise<T>;
}
