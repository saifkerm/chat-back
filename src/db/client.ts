export class DbClient {

  /**
   * Database Logic Factory
   */
  static factory<T>(model: { new (): T }): T {
    return new model();
  }
}