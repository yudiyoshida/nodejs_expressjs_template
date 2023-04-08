import { RequestHandler } from 'express';
import { LoginDto } from './dtos/login.dto';

import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public login: RequestHandler = async(req, res, next) => {
    try {
      req.body = this.validateSchema(LoginDto, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  };
}

export default new Validator();
