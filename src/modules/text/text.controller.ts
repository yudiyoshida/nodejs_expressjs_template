import { RequestHandler } from 'express';
import { TextType } from '@prisma/client';
import { UpdateTextDto } from './dtos/update-text.dto';

import Service from './text.service';
import AppException from '@errors/app-exception';

class Controller {
  public findOne: RequestHandler = async(req, res, next) => {
    try {
      const text = await Service.findByType(req.query.type as TextType);
      res.status(200).json(text);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    try {
      const data = req.body as UpdateTextDto;

      const text = await Service.findByType(req.query.type as TextType);
      const result = await Service.update(text.id, data);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
