import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AccountRole, Permissions } from '@prisma/client';
import { IPayloadDto } from 'modules/auth/dtos/payload.dto';

import Passport from '@libs/passport';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import AdminService from 'modules/auth/services/admin/admin.service';

class AuthMiddleware {
  public authentication: RequestHandler = (req, res, next) => {
    Passport.authenticate('jwt', { session: false, failWithError: true },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: any, payload: IPayloadDto, info: any) => {
        if (err) return next(err);
        if (!payload) return next(new AppException(401, ErrorMessages.UNATHORIZED));
        else req.auth = payload;
      },
    )(req, res, next);
    next();
  };

  public roles(...roles: AccountRole[]) {
    return async(req: Request, res: Response, next: NextFunction) => {
      try {
        if (!roles.includes(req.auth.role)) throw new Error();
        else next();

      } catch (err: any) {
        next(new AppException(403, ErrorMessages.FORBIDDEN));

      }
    };
  }

  public authorization(permission: Permissions) {
    return async(req: Request, res: Response, next: NextFunction) => {
      try {
        // check if is an admin user.
        if (req.auth.role !== AccountRole.admin) return next();

        // if check passes, then verify if admin has permission to access this module.
        const permissions = await AdminService.findAllPermissions(req.auth.id);
        if (!permissions) throw new Error();

        const hasPermission = permissions.some(elem => elem.title === permission);
        if (!hasPermission) throw new Error();
        next();

      } catch (err: any) {
        next(new AppException(403, ErrorMessages.FORBIDDEN));

      }
    };
  }
}

export default new AuthMiddleware();
