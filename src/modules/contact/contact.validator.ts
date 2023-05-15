import { RequestHandler } from 'express';
import { SendEmail } from './dtos/send-email.dto';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public sendEmail: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', SendEmail, req, next);
  };
}

export default new Validator();
