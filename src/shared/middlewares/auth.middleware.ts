import { Request, Response, NextFunction } from 'express';
import { AccountRole, Permissions } from '@prisma/client';
import { IPayloadDto } from '../../modules/auth/dtos/payload.dto';

import AdminService from '../../modules/auth/services/admin/admin.service';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import Passport from '@libs/passport';

class AuthMiddleware {
  public authentication(req: Request, res: Response, next: NextFunction) {
    Passport.authenticate('jwt', { session: false, failWithError: true },
      (err: any, payload: IPayloadDto) => {
        if (err) return next(err);
        if (!payload) return next(new AppException(401, ErrorMessages.UNATHORIZED));

        req.auth = payload;
        next();
      },
    )(req, res, next);
  }

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
