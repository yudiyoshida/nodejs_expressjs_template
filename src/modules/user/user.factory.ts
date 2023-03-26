import { Prisma, Status, UserType } from '@prisma/client';
import { ICreateUserDTO, IUpdateUserDTO } from './dtos/user.dto';
import PasswordHelper from '@helpers/password';

class UserFactory {
  public createUser(body: ICreateUserDTO) {
    const user: Prisma.UserCreateInput = {
      isAdmin: false,
      type: body.type as UserType,
      name: body.name,
      birthday: body.birthday,
      document: body.document,
      phone: body.phone,
      email: body.email,
      password: PasswordHelper.hash(body.password),
      status: Status.ativo,
      imageKey: body.imageKey,
      imageUrl: body.imageUrl,
    };

    return { user };
  }

  public updateUser(body: IUpdateUserDTO) {
    const user: Prisma.UserUpdateInput = {
      name: body.name,
      birthday: body.birthday,
      document: body.document,
      phone: body.phone,
      email: body.email,
      imageKey: body.imageKey,
      imageUrl: body.imageUrl,
    };

    return { user };
  }
}

export default new UserFactory();
