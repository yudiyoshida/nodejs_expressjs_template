import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AccountType, Permissions } from '@prisma/client';

import passport from '@libs/passport';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class AuthMiddleware {
  public isAuthenticated: RequestHandler = (req, res, next) => {
    passport.authenticate('jwt', { session: false, failWithError: true },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: any, payload: any, info: any) => {
        if (err) return next(err);
        if (!payload) return next(new AppException(401, ErrorMessages.UNATHORIZED));
        else req.auth = payload;
      },
    )(req, res, next);
    next();
  };

  public isAdmin: RequestHandler = (req, res, next) => {
    try {
      if (req.auth.type !== AccountType.admin) throw new Error();
      else next();

    } catch (err: any) {
      next(new AppException(403, ErrorMessages.FORBIDDEN));

    }
  };

  public isAuthorized(permission: Permissions) {
    return async(req: Request, res: Response, next: NextFunction) => {
      try {
        // Checa se não é user admin.
        if (req.auth.type !== AccountType.admin) return next();

        // Se for admin, então verifica se possui permissão para acessar o recurso.
        const hasPermission = req.auth.permissions.some(
          elem => elem.title === permission,
        );
        if (hasPermission) return next();
        else throw new Error();

      } catch (err: any) {
        next(new AppException(403, ErrorMessages.FORBIDDEN));

      }
    };
  }
}

export default new AuthMiddleware();
