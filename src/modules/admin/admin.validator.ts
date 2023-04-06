import { RequestHandler } from 'express';
import { CreateAdminAccountDto } from './dtos/create-admin';

import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public createAdminAccount: RequestHandler = async(req, res, next) => {
    try {
      req.body = this.validateSchema(CreateAdminAccountDto, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  };
}

export default new Validator();
