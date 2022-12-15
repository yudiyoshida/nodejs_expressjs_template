import DataSource from '@database/data-source';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.permission;
  }

  public async findAll() {
    return await this.repository.findMany({
      orderBy: { id: 'asc' },
    });
  }

  public async findById(id: number) {
    return await this.repository.findUnique({
      where: { id },
    });
  }
}

export default new Service();
