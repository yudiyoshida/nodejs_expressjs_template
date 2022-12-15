import { Request, Response, NextFunction } from 'express';
import { TextType } from '@prisma/client';

import yup from '@lib/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class TextValidator extends BaseValidator {
  constructor() {
    super();
  }

  public update = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      content: yup.string().trim().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public queryParams = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      type: yup.string().trim().required().oneOf(Object.values(TextType)),
    });

    try {
      req.query = await this.validateSchema(schema, req.query);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };
}

export default new TextValidator();
