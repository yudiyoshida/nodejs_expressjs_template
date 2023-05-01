import { RequestHandler } from 'express';
import { TextType } from '@prisma/client';

import Service from './text.service';
import AppException from '@errors/app-exception';

class Controller {
  public findOne: RequestHandler = async(req, res, next) => {
    try {
      const { type } = req.query;

      const text = await Service.findByType(type as TextType);
      res.status(200).json(text);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
