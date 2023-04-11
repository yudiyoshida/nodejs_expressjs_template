import { Prisma, PrismaClient, AdminPermission, ProfileStatus, ProfileRole } from '@prisma/client';
import PasswordHelper from '../../src/shared/helpers/password';

const permissions = Object.values(AdminPermission);
const admin: Prisma.ProfileCreateInput = {
  role: ProfileRole.admin,
  email: 'admin@getnada.com',
  password: PasswordHelper.hash('123456789'),
  status: ProfileStatus.ativo,
  admin: {
    create: {
      name: 'Admin master [name]',
    },
  },
};

export async function seedAdmin(prisma: PrismaClient): Promise<void> {
  const adminProfile = await prisma.profile.create({
    data: admin,
    include: { admin: true },
  });

  for (const permission of permissions) {
    await prisma.permission.create({
      data: {
        title: permission,
        admins: {
          connect: { profileId: adminProfile.id },
        },
      },
    });
  }

  console.log('Admin user seed OK.');
}
