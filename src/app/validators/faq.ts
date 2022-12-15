import { Request, Response, NextFunction } from 'express';

import yup from '@lib/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class FaqValidator extends BaseValidator {
  constructor() {
    super();
  }

  public upsert = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      answer: yup.string().trim().required(),
      question: yup.string().trim().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };
}

export default new FaqValidator();
