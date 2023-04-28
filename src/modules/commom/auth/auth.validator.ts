import { RequestHandler } from 'express';
import { LoginDto } from './dtos/login.dto';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public login: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', LoginDto, req, next);
  };
}

export default new Validator();
