import { RequestHandler } from 'express';
import { Status } from '@prisma/client';
import { LoginOutputDto } from './dtos/login.dto';
import { IAuthDto } from './dtos/auth.dto';

import Service from './auth.service';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import JwtHelper from '@helpers/token';
import PasswordHelper from '@helpers/password';

class Controller {
  public login: RequestHandler = async(req, res, next) => {
    try {
      const { username, password, type } = req.body as LoginOutputDto;

      // TODO: como aplicar strategy.
      const account = await Service.findByUsername(username);

      const isPasswordCorrect = PasswordHelper.comparePasswordAndHash(password, account.password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);

      if (account.status === Status.inativo) {
        throw new AppException(403, ErrorMessages.INACTIVE);

      } else if (account.status === Status.pendente) {
        throw new AppException(412, ErrorMessages.PENDING);

      } else {
        const payload: IAuthDto = {
          id: account.id,
          type: account.type,
          permissions: account.permissions,
        };
        res.status(200).json({
          token: JwtHelper.createToken(payload),
          account: await Service.findById(payload.id),
        });
      }

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
