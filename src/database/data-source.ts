import { PrismaClient } from '@prisma/client';

// Design pattern Singleton.
class DataSource {
  private static db: PrismaClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static getInstance(): PrismaClient {
    if (!DataSource.db) {
      DataSource.db = new PrismaClient({ errorFormat: 'minimal' });
    }

    return DataSource.db;
  }
}

export default DataSource.getInstance();
