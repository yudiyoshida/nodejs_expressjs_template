import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { Prisma } from '@prisma/client';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findByCredential(credential: string) {
    const user = await this.repository.findFirst({
      where: {
        OR: [
          { email: credential },
        ],
      },
    });

    if (!user) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    else return user;
  }

  public async findByCredentialAndCode(credential: string, code: string) {
    const user = await this.repository.findFirst({
      where: {
        code,
        OR: [
          { email: credential },
        ],
      },
    });

    if (!user) throw new AppException(400, ErrorMessages.INCORRECT_CODE_PASS);
    else return user;
  }

  public async findByUniqueFields(data: Prisma.UserWhereInput) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: data.email },
        ],
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

export default new Service();
