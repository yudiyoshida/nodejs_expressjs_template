import { RequestHandler } from 'express';
import { AccountStatus } from '@prisma/client';
import { LoginOutputDto } from './dtos/login.dto';
import { IAuthDto } from './dtos/auth.dto';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import JwtHelper from '@helpers/token';
import PasswordHelper from '@helpers/password';
import AdminService from 'modules/admin/admin.service';
import UserService from 'modules/user/user.service';

class Controller {
  private strategies = {
    admin: AdminService,
    user: UserService,
  };

  public login: RequestHandler = async(req, res, next) => {
    try {
      const { username, password, role } = req.body as LoginOutputDto;

      // find account.
      const account = await this.strategies[role].findByUsername(username);
      if (!account) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);

      // check password.
      const isPasswordCorrect = PasswordHelper.comparePasswordAndHash(password, account.password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);

      // check if account is active.
      if (account.status === AccountStatus.inativo) throw new AppException(403, ErrorMessages.INACTIVE);
      if (account.status === AccountStatus.pendente) throw new AppException(412, ErrorMessages.PENDING);

      // generate token and send response.
      const { id, type, name, imageUrl } = account;
      const payload: IAuthDto = { id, type };

      res.status(200).json({
        token: JwtHelper.createToken(payload),
        account: { id, type, name, imageUrl },
      });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
