import request from 'supertest';

import { Prisma, PrismaClient, AdminPermission, Status, TextType, UserType } from '@prisma/client';
import PasswordHelper from '../../src/shared/helpers/password';

const prisma = new PrismaClient();

class SetupDatabase {
  private admin: Prisma.UserCreateInput;
  private userApp: Prisma.UserCreateInput;

  public adminToken: string;
  public userToken: string;

  constructor() {
    this.admin = {
      isAdmin: true,
      type: UserType.admin,
      name: 'Admin Master',
      email: 'admin@getnada.com',
      password: PasswordHelper.hash('123456789'),
      status: Status.ativo,
      phone: '00123456789',
      document: '64948845043',
    };
    this.userApp = {
      isAdmin: false,
      type: UserType.app,
      name: 'User app',
      email: 'userapp@getnada.com',
      password: PasswordHelper.hash('123456789'),
      status: Status.ativo,
      phone: '10123456789',
      document: '67321917053',
      birthday: new Date('1996-01-03'),
    };
    this.adminToken = '';
    this.userToken = '';
  }

  public async dropDatabase() {
    await prisma.address.deleteMany({ where: {} });
    await prisma.faq.deleteMany({ where: {} });
    await prisma.permission.deleteMany({ where: {} });
    await prisma.security.deleteMany({ where: {} });
    await prisma.text.deleteMany({ where: {} });
    await prisma.user.deleteMany({ where: {} });
  }

  public async seedAdminFullAccess() {
    const admin = await prisma.user.create({
      data: this.admin,
    });

    for (const permission of Object.values(AdminPermission)) {
      await prisma.permission.create({
        data: {
          title: permission,
          admins: {
            connect: { id: admin.id },
          },
        },
      });
    }
  }

  public async seedUserApp() {
    await prisma.user.create({
      data: this.userApp,
    });
  }

  public async seedTexts() {
    for (const text of Object.values(TextType)) {
      await prisma.text.create({
        data: {
          type: text,
          content: `${text} vindo da API. Rota integrada.`,
        },
      });
    }
  }

  public async loginAdmin(app: any) {
    const admin = await request(app)
      .post('/auth/login')
      .send({
        'username': 'admin@getnada.com',
        'password': '123456789',
      });
    this.adminToken = admin.body.token;
  }

  public async loginUser(app: any) {
    const admin = await request(app)
      .post('/auth/login')
      .send({
        'username': 'userapp@getnada.com',
        'password': '123456789',
      });
    this.userToken = admin.body.token;
  }
}

export default new SetupDatabase();
