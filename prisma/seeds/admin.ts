import { Prisma, PrismaClient, Permissions, AccountStatus, AccountRole } from '@prisma/client';
import PasswordHelper from '../../src/shared/helpers/password';

const permissions = Object.values(Permissions);
const admin: Prisma.AdminCreateInput = {
  role: AccountRole.admin,
  name: 'Admin Master',
  email: 'admin@getnada.com',
  password: PasswordHelper.hash('123456789'),
  status: AccountStatus.ativo,
};

export async function seedAdmin(prisma: PrismaClient): Promise<void> {
  const newAdmin = await prisma.admin.create({
    data: admin,
  });

  for (const permission of permissions) {
    await prisma.permission.create({
      data: {
        title: permission,
        account: {
          connect: { id: newAdmin.id },
        },
      },
    });
  }

  console.log('Admin user seed OK.');
}
