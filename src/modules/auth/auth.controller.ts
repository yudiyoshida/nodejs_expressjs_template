import { RequestHandler } from 'express';
import { ProfileStatus } from '@prisma/client';
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
      const { username, password } = req.body as LoginOutputDto;

      const profile = await Service.findByUsername(username);
      if (!profile) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);

      const isPasswordCorrect = PasswordHelper.comparePasswordAndHash(password, profile.password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);

      const { id, role, status } = profile;
      if (status !== ProfileStatus.ativo) {
        throw new AppException(403, ErrorMessages.FORBIDDEN);

      } else {
        const payload: IAuthDto = { id, role };
        const token = JwtHelper.createToken(payload);
        res.status(200).json({ token, profile: await Service.findById(id) });

      }

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
