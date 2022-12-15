import { RequestHandler } from 'express';
import { TextType } from '@prisma/client';

import Service from './text.service';
import AppException from '@errors/app-exception';

class Controller {
  public findByType: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findByType(req.query.type as TextType);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public update: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.update(req.query.type as TextType, req.body);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
