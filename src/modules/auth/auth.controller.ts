import { RequestHandler } from 'express';
import { AccountStatus } from '@prisma/client';
import { LoginOutputDto } from './dtos/login.dto';
import { IPayloadDto } from './dtos/payload.dto';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import JwtHelper from '@helpers/token';
import PasswordHelper from '@helpers/password';

import AdminService from 'modules/admin/admin.service';
import UserService from 'modules/user/user.service';

class Controller {
  public loginAdm: RequestHandler = async(req, res, next) => {
    try {
      const { credential, password } = req.body as LoginOutputDto;

      // find account.
      const admin = await AdminService.findByCredential(credential);

      // check password.
      PasswordHelper.comparePasswordAndHash(password, admin.password);

      // check if admin is active.
      if (admin.status === AccountStatus.inativo) throw new AppException(403, ErrorMessages.INACTIVE);
      if (admin.status === AccountStatus.pendente) throw new AppException(403, ErrorMessages.PENDING);

      // generate token and send response.
      const { id, role, name, imageUrl } = admin;
      const payload: IPayloadDto = { id, role };

      res.status(200).json({
        token: JwtHelper.createToken(payload),
        account: { id, role, name, imageUrl },
      });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public loginUser: RequestHandler = async(req, res, next) => {
    try {
      const { credential, password } = req.body as LoginOutputDto;

      // find account.
      const user = await UserService.findByCredential(credential);

      // check password.
      PasswordHelper.comparePasswordAndHash(password, user.password);

      // check if user is active.
      if (user.status === AccountStatus.inativo) throw new AppException(403, ErrorMessages.INACTIVE);
      if (user.status === AccountStatus.pendente) throw new AppException(403, ErrorMessages.PENDING);

      // generate token and send response.
      const { id, role, type, name, imageUrl } = user;
      const payload: IPayloadDto = { id, role, type };

      res.status(200).json({
        token: JwtHelper.createToken(payload),
        account: { id, role, type, name, imageUrl },
      });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
