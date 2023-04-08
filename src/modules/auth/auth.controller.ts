import { RequestHandler } from 'express';
import { LoginOutputDto } from './dtos/login.dto';
import { Status } from '@prisma/client';
import { AuthDto } from './dtos/auth.dto';

import Service from './auth.service';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PasswordHelper from '@helpers/password';
import JwtHelper from '@helpers/token';

class Controller {
  public login: RequestHandler = async(req, res, next) => {
    try {
      const { username, password } = req.body as LoginOutputDto;

      const account = await Service.findByUsername(username);
      if (!account) throw new AppException(501, ErrorMessages.INVALID_CREDENTIALS);

      const isPasswordCorrect = PasswordHelper.comparePasswordAndHash(password, account.password);
      if (!isPasswordCorrect) throw new AppException(502, ErrorMessages.INVALID_CREDENTIALS);

      if (account.status !== Status.ativo) {
        throw new AppException(403, ErrorMessages.FORBIDDEN);

      } else {
        const payload: AuthDto = {
          id: account.id,
          isAdmin: account.isAdmin,
          type: account.type,
          permissions: account.permissions,
        };
        const token = JwtHelper.createToken(payload);
        res.status(200).json({ token, account: await Service.findById(account.id) });

      }

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
