import { RequestHandler } from 'express';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public createOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', CreateAdminDto, req, next);
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', UpdateAdminDto, req, next);
  };
}

export default new Validator();
