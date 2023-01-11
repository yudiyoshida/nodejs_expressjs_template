import DataSource from '@database/data-source';
import { Prisma } from '@prisma/client';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findById<T extends Prisma.UserSelect>(id: number, dto: T) {
    return await this.repository.findUnique({
      where: { id },
      select: dto,
    });
  }

  public async findByUserName(username: string) {
    return await this.repository.findFirst({
      where: {
        OR: [
          { email: username },
          { phone: username },
        ],
      },
      include: { permissions: true },
    });
  }

  public async findByUniqueFields(data: Prisma.UserWhereInput) {
    return await this.repository.findFirst({
      where: {
        OR: [
          { document: data.document },
          { email: data.email },
          { phone: data.phone },
        ],
      },
    });
  }

  public async findByEmail(email: string) {
    return await this.repository.findUnique({
      where: { email },
    });
  }

  public async findByEmailAndCode(email: string, code: string) {
    return await this.repository.findFirst({
      where: { email, code },
    });
  }

  public async storeCode(id: number, code: string, codeExpiresIn: Date) {
    return await this.repository.update({
      where: { id },
      data: {
        code,
        codeExpiresIn,
      },
    });
  }

  public async changePassword(id: number, password: string) {
    return await this.repository.update({
      where: { id },
      data: {
        password,
        code: null,
        codeExpiresIn: null,
      },
    });
  }
}

export default new Service();
