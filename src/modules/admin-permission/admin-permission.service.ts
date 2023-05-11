import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.permission;
  }

  public async findAll() {
    return this.repository.findMany();
  }

  public async findById(id: number) {
    const permission = await this.repository.findUnique({
      where: { id },
    });

    if (!permission) throw new AppException(404, ErrorMessages.PERMISSION_NOT_FOUND);
    else return permission;
  }

  public async checkIfPermissionsExists(ids: number[]) {
    await Promise.all(
      ids.map(async(id) => await this.findById(id)),
    );
  }
}

export default new Service();
