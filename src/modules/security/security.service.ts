import DataSource from '@database/data-source';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.security;
  }

  public async findByValidatedEmail(email: string) {
    return this.repository.findFirst({
      where: { email, validated: true },
    });
  }

  public async findByEmailAndCode(email: string, code: string) {
    return this.repository.findFirst({
      where: { email, code },
    });
  }

  public async storeCode(email: string, code: string, codeExpiresIn: Date) {
    return this.repository.upsert({
      where: {
        email,
      },
      create: {
        email,
        code,
        codeExpiresIn,
      },
      update: {
        code,
        codeExpiresIn,
        validated: false,
      },
    });
  }

  public async validateCode(id: number) {
    return this.repository.update({
      where: { id },
      data: {
        code: null,
        codeExpiresIn: null,
        validated: true,
      },
    });
  }
}

export default new Service();
