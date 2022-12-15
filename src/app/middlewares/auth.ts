import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { UserType } from '@prisma/client';

import passport from '@lib/passport';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import { Auth } from '@interfaces/auth';

class AuthMiddleware {
  public isAuthenticated = async(req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false, failWithError: true },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err, payload, info) => {
        if (err) return next(err);
        if (!payload) return next(new AppException(401, ErrorMessages.UNATHORIZED));
        else req.user = payload;
      },
    )(req, res, next);
    next();
  };

  public isAdmin = async(req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(req.user as Auth).is_admin) throw new Error();
      else next();

    } catch (err) {
      next(new AppException(403, ErrorMessages.FORBIDDEN));

    }
  };

  public isApp = async(req: Request, res: Response, next: NextFunction) => {
    try {
      if ((req.user as Auth).is_admin) throw new Error();
      if ((req.user as Auth).type !== UserType.app) throw new Error();
      else next();

    } catch (err) {
      next(new AppException(403, ErrorMessages.FORBIDDEN));

    }
  };

  public isAuthorized(permission: string) {
    return async(req: Request, res: Response, next: NextFunction) => {
      try {
        // Checa se é user admin.
        if (!(req.user as Auth).is_admin) return next();

        // Se sim, verifica se ele possui permissão no módulo.
        for (const elem of (req.user as Auth).permissions) {
          if (elem.title === permission) return next();
        }
        throw new Error();

      } catch (err) {
        next(new AppException(403, ErrorMessages.FORBIDDEN));

      }
    };
  }
}

export default new AuthMiddleware();
