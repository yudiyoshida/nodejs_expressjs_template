import DataSource from '@database/data-source';

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.permission;
  }

  public findAll() {
    return this.repository.findMany();
  }

  public findById(id: number) {
    return this.repository.findUnique({
      where: { id },
    });
  }
}

export default new Repository();
