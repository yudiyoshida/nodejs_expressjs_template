import { Request, Response, NextFunction } from 'express';

import yup from '@lib/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class ContactValidator extends BaseValidator {
  constructor() {
    super();
  }

  public sendEmail = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      message: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
      name: yup.string().trim().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };
}

export default new ContactValidator();
