import { RequestHandler } from 'express';

import Service from './admin-permission.service';
import AppException from '@errors/app-exception';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findAll();
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
