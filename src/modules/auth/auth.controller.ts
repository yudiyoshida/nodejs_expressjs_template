import { RequestHandler } from 'express';

import AdminService from './services/admin/admin.service';
import UserService from './services/user/user.service';
import AppException from '@errors/app-exception';

class Controller {
  public loginAdm: RequestHandler = async(req, res, next) => {
    try {
      const response = await AdminService.loginAdm(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public forgotPasswordAdm: RequestHandler = async(req, res, next) => {
    try {
      const response = await AdminService.forgotPasswordAdm(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public resetPasswordAdm: RequestHandler = async(req, res, next) => {
    try {
      const response = await AdminService.resetPasswordAdm(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };


  public loginUser: RequestHandler = async(req, res, next) => {
    try {
      const response = await UserService.loginUser(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public forgotPasswordUser: RequestHandler = async(req, res, next) => {
    try {
      const response = await UserService.forgotPasswordUser(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public resetPasswordUser: RequestHandler = async(req, res, next) => {
    try {
      const response = await UserService.resetPasswordUser(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
