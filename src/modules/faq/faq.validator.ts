import { RequestHandler } from 'express';
import { CreateFaq } from './dtos/create-faq.dto';
import { UpdateFaq } from './dtos/update-faq.dto';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public createOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', CreateFaq, req, next);
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', UpdateFaq, req, next);
  };
}

export default new Validator();
