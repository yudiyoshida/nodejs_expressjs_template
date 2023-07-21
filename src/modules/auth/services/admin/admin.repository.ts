import DataSource from '@database/data-source';

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.admin;
  }

  public async findAllPermissions(id: number) {
    return this.repository.findUnique({
      where: { id },
    }).permissions();
  }

  public async findByCredential(credential: string, code?: string) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: credential },
        ],
        code,
      },
    });
  }

  public async storeCode(id: number, code: string, codeExpiresIn: Date) {
    return this.repository.update({
      where: { id },
      data: {
        code,
        codeExpiresIn,
      },
    });
  }

  public async changePassword(id: number, password: string) {
    return this.repository.update({
      where: { id },
      data: {
        code: null,
        codeExpiresIn: null,
        password,
      },
    });
  }
}

export default new Repository();
