import { Prisma, PrismaClient, AdminPermission, UserType, TextType, Status } from '@prisma/client';
import PasswordHelper from '../src/app/helpers/password';

const prisma = new PrismaClient();

class SeedPrisma {
  private admin: Prisma.UserCreateInput;
  private permissions: AdminPermission[];
  private texts: TextType[];

  constructor() {
    this.admin = {
      is_admin: true,
      type: UserType.admin,
      name: 'Admin Master',
      email: 'admin@getnada.com',
      password: '123456789',
      phone: '00123456789',
      status: Status.ativo,
    };
    this.permissions = Object.values(AdminPermission);
    this.texts = Object.values(TextType);
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

  public async seedAdmin() {
    this.admin.password = PasswordHelper.hash(this.admin.password);
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
}

async function main() {
  const Seed = new SeedPrisma();

  await Seed.seedTexts();
  console.log('Texts seed OK.');

  await Seed.seedAdmin();
  console.log('Admin user seed OK.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async() => {
    await prisma.$disconnect();
  });
