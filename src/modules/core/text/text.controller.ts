import { RequestHandler } from 'express';
import { TextType } from '@prisma/client';

import Service from './text.service';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Controller {
  public findByType: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findByType(req.query.type as TextType);
      if (!result) throw new AppException(404, ErrorMessages.TEXT_NOT_FOUND);
      else res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public update: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findByType(req.query.type as TextType);
      if (!result) throw new AppException(404, ErrorMessages.TEXT_NOT_FOUND);

      const text = await Service.update(req.query.type as TextType, req.body);
      res.status(200).json(text);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
