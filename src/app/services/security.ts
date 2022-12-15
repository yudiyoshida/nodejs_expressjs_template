import { Prisma } from '@prisma/client';
import { PrismaModel } from '@customTypes/prisma-model';
import DataSource from '@database/data-source';

class SecurityService {
  private readonly repository: Prisma.SecurityDelegate<PrismaModel>;

  constructor() {
    this.repository = DataSource.security;
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

  public async storeCode(email: string, code: string, code_expires_in: Date) {
    return await this.repository.upsert({
      where: {
        email,
      },
      create: {
        email,
        code,
        code_expires_in,
      },
      update: {
        code,
        code_expires_in,
        validated: false,
      },
    });
  }

  public async validateCode(id: number) {
    return await this.repository.update({
      where: { id },
      data: {
        code: null,
        code_expires_in: null,
        validated: true,
      },
    });
  }
}

export default new SecurityService();
