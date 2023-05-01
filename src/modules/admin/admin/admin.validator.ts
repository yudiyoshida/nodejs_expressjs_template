import { RequestHandler } from 'express';
import { CreateAdmin } from './dtos/create-admin.dto';
import { UpdateAdmin } from './dtos/update-admin.dto';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public createOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', CreateAdmin, req, next);
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', UpdateAdmin, req, next);
  };
}

export default new Validator();
