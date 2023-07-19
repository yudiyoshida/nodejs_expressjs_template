import { RequestHandler } from 'express';

import Service from './admin-permission.service';
import AppException from '@errors/app-exception';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const response = await Service.findAll();
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
