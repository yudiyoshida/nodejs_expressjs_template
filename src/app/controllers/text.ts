import { Request, Response, NextFunction } from 'express';
import { TextType } from '@prisma/client';

import TextService from '@services/text';
import AppException from '@errors/app-exception';

class TextController {
  public findByType = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TextService.findByType(req.query.type as TextType);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public update = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TextService.update(req.query.type as TextType, req.body);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new TextController();
