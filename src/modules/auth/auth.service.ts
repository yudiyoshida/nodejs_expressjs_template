import DataSource from '@database/data-source';
import { Prisma } from '@prisma/client';
import { AccountDTO } from './dtos/auth.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findById(id: number) {
    return await this.repository.findUnique({
      where: { id },
      select: AccountDTO,
    });
  }

  public async findByIdAllFields(id: number) {
    return await this.repository.findUnique({
      where: { id },
      include: { permissions: true },
    });
  }

  public async findByUserName(username: string) {
    return await this.repository.findFirst({
      where: {
        OR: [
          { email: username },
          // { phone: username },
        ],
      },
      include: { permissions: true },
    });
  }

  public async findByUniqueFields(data: Prisma.UserCreateInput) {
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

  public async findByUniqueFieldsExceptMe(id: number, data: any) {
    return await this.repository.findFirst({
      where: {
        NOT: [
          { id },
        ],
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
