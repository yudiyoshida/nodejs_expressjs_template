import { Prisma, PrismaClient, AccountStatus, AccountRole } from '@prisma/client';
import PasswordHelper from '../../src/shared/helpers/password';

const user: Prisma.UserCreateInput = {
  role: AccountRole.user,
  name: 'User 01',
  email: 'user@getnada.com',
  password: PasswordHelper.hash('123456789'),
  status: AccountStatus.ativo,
};

export async function seedUser(prisma: PrismaClient): Promise<void> {
  await prisma.user.create({
    data: user,
  });

  console.log('User user seed OK.');
}
