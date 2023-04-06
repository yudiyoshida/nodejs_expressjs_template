import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.permission;
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
    });
  }

  public async checkIfPermissionsExists(permissions: number[]) {
    await Promise.all(
      permissions.map(async(item) => {
        const permission = await this.findById(item);
        if (!permission) throw new AppException(404, ErrorMessages.PERMISSION_NOT_FOUND);
      }),
    );
  }
}

export default new Service();
