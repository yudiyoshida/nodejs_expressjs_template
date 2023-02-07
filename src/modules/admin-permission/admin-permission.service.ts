import DataSource from '@database/data-source';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.permission;
  }

  public async findAll() {
    return this.repository.findMany({
      orderBy: { id: 'asc' },
    });
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
    });
  }
}

export default new Service();
