import { RequestHandler } from 'express';

import Service from './auth.service';
import AppException from '@errors/app-exception';

class Controller {
  public loginAdm: RequestHandler = async(req, res, next) => {
    try {
      const response = await Service.loginAdm(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public forgotPasswordAdm: RequestHandler = async(req, res, next) => {
    try {
      const response = await Service.forgotPasswordAdm(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public resetPasswordAdm: RequestHandler = async(req, res, next) => {
    try {
      const response = await Service.resetPasswordAdm(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };


  public loginUser: RequestHandler = async(req, res, next) => {
    try {
      const response = await Service.loginUser(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public forgotPasswordUser: RequestHandler = async(req, res, next) => {
    try {
      const response = await Service.forgotPasswordUser(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public resetPasswordUser: RequestHandler = async(req, res, next) => {
    try {
      const response = await Service.resetPasswordUser(req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
