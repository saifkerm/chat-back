import mongoose from 'mongoose';
import { MONGODB_CONFIG } from '../config';
import { IDbConnection } from '../interface';
import { provide } from 'inversify-binding-decorators';
export const MONGO_SYMBOL = {
  MongoDBConnection: Symbol.for('MongoDBConnection')
};
@provide(MONGO_SYMBOL.MongoDBConnection)
export class MongoDBConnection implements IDbConnection {

  /**
   * Connection to mongodb database with mongoose
   *
   * @returns {void} return void
   */
  connect(): mongoose.Connection {
    const { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD, DB_PORT } = MONGODB_CONFIG;

    const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

    return mongoose.createConnection(DB_URI,{ dbName: DB_NAME });
  }
}