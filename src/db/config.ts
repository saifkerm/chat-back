import { DB_CONFIG } from '../types/types';

export const MONGODB_CONFIG: DB_CONFIG = {
  DB_PORT: process.env.DB_PORT || 27017,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'chat',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
}

export const MONGODB_PROVIDE = {
  MongoDBConnection: Symbol.for('MongoDBConnection')
};
