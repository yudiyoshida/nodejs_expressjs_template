import { Prisma, PrismaClient, AdminPermission, Status, TextType, UserType } from '@prisma/client';
import PasswordHelper from '../src/shared/helpers/password';

const prisma = new PrismaClient();

class SeedPrisma {
  private admin: Prisma.UserCreateInput;
  private permissions: AdminPermission[];
  private texts: TextType[];

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
    this.permissions = Object.values(AdminPermission);
    this.texts = Object.values(TextType);
  }

  public async seedAdmin() {
    const admin = await prisma.user.create({
      data: this.admin,
    });

    for (const permission of this.permissions) {
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

  public async seedTexts() {
    for (const text of this.texts) {
      await prisma.text.create({
        data: {
          type: text,
          content: `${text} vindo da API. Rota integrada.`,
        },
      });
    }
  }
}

async function main() {
  const Seed = new SeedPrisma();

  await Seed.seedAdmin();
  console.log('Admin user seed OK.');

  await Seed.seedTexts();
  console.log('Texts seed OK.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async() => {
    await prisma.$disconnect();
  });
