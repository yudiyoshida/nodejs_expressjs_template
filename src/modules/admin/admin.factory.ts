import { Prisma, Status, UserType } from '@prisma/client';
import { IUpsertAdminDTO } from './dtos/admin.dto';

import PasswordHelper from '@helpers/password';
import { IAdminPermissionIdDTO } from 'modules/admin-permission/dtos/admin-permission';

class AdminFactory {
  public createAdmin(body: IUpsertAdminDTO) {
    const password = PasswordHelper.generate();
    const permissions = this.formatAdminPermissions(body.permissions);

    const admin: Prisma.UserCreateInput = {
      isAdmin: true,
      type: UserType.admin,
      name: body.name,
      document: body.document,
      phone: body.phone,
      email: body.email,
      password: PasswordHelper.hash(password),
      status: Status.ativo,
      imageKey: body.imageKey,
      imageUrl: body.imageUrl,
    };

    return { admin, permissions, password };
  }

  public updateAdmin(body: IUpsertAdminDTO) {
    const permissions = this.formatAdminPermissions(body.permissions);
    const admin: Prisma.UserUpdateInput = {
      name: body.name,
      document: body.document,
      phone: body.phone,
      email: body.email,
      imageKey: body.imageKey,
      imageUrl: body.imageUrl,
    };

    return { admin, permissions };
  }

  private formatAdminPermissions(permissions: number[]): IAdminPermissionIdDTO[] {
    return permissions.map((id) => {
      return { id };
    });
  }
}

export default new AdminFactory();
