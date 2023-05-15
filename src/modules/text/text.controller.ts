import { RequestHandler } from 'express';
import { UpdateTextOutputDto } from './dtos/update-text.dto';
import { TextDtoAsAdmin, TextDtoAsNoAuth } from './dtos/text.dto';
import { TextType } from '@prisma/client';

import Service from './text.service';
import AppException from '@errors/app-exception';

class Controller {
  public findOne: RequestHandler = async(req, res, next) => {
    try {
      const { type } = req.query;

      const text = (req.auth?.role === 'admin')
        ? await Service.findByType(type as TextType, TextDtoAsAdmin)
        : await Service.findByType(type as TextType, TextDtoAsNoAuth);
      res.status(200).json(text);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    try {
      const data = req.body as UpdateTextOutputDto;
      const { type } = req.query;

      const text = await Service.findByType(type as TextType, TextDtoAsAdmin);
      const result = await Service.update(text.id, data);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
