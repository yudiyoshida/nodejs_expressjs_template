import { Request, Response, NextFunction } from 'express';

import yup from '@lib/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class AdminValidator extends BaseValidator {
  constructor() {
    super();
  }

  public createAdmin = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      permissions: yup.array().of(yup.number().positive().integer()).min(1).required(),
      password: yup.string().min(8).required(),
      phone: yup.string().trim().phone().required(),
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

export default new AdminValidator();
