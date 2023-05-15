import { RequestHandler } from 'express';
import { Login } from './dtos/login.dto';
import { ForgotPassword, ResetPassword } from './dtos/password';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public login: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', Login, req, next);
  };

  public forgotPassword: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', ForgotPassword, req, next);
  };

  public resetPassword: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', ResetPassword, req, next);
  };
}

export default new Validator();
