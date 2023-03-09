import 'reflect-metadata';
import { DataSource } from 'typeorm';

class AppDataSource {
  private static db: DataSource;

  // The singleton's constructor should always be private to prevent direct construction calls with the `new` operator.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static getInstance(): DataSource {
    if (!AppDataSource.db) {
      AppDataSource.db = new DataSource({
        type: 'mysql',
        url: process.env.DB_URL,
        synchronize: false,
        logging: false,
        entities: [],
        migrations: [],
      });
    }

    return AppDataSource.db;
  }
}

export default AppDataSource.getInstance();
