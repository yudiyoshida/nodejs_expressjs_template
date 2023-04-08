import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AdminPermission } from '@prisma/client';

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
      if (!req.auth.isAdmin) throw new Error();
      else next();

    } catch (err: any) {
      next(new AppException(403, ErrorMessages.FORBIDDEN));

    }
  };

  public isAuthorized(permission: AdminPermission) {
    return async(req: Request, res: Response, next: NextFunction) => {
      try {
        // Checa se não é user admin.
        if (!req.auth.isAdmin) return next();

        // Se for admin, então verifica se possui permissão para acessar o recurso.
        for (const element of req.auth.permissions) {
          if (element.title === permission) return next();
        }
        throw new Error();

      } catch (err: any) {
        next(new AppException(403, ErrorMessages.FORBIDDEN));

      }
    };
  }
}

export default new AuthMiddleware();
