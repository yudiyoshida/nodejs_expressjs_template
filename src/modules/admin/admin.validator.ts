import { RequestHandler } from 'express';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public createAdmin: RequestHandler = async(req, res, next) => {
    try {
      req.body = this.validateSchema(CreateAdminDto, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    try {
      req.body = this.validateSchema(UpdateAdminDto, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  };
}

export default new Validator();
