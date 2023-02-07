import DataSource from '@database/data-source';
import { Prisma } from '@prisma/client';
import { AccountDTO } from './dtos/auth.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: AccountDTO,
    });
  }

  public async findByIdAllFields(id: number) {
    return this.repository.findUnique({
      where: { id },
      include: { permissions: true },
    });
  }

  public async findByUserName(username: string) {
    return this.repository.findFirst({
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
    return this.repository.findFirst({
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
    return this.repository.findFirst({
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
    return this.repository.findUnique({
      where: { email },
    });
  }

  public async findByEmailAndCode(email: string, code: string) {
    return this.repository.findFirst({
      where: { email, code },
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
        password,
        code: null,
        codeExpiresIn: null,
      },
    });
  }
}

export default new Service();
