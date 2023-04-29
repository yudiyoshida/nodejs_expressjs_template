import { RequestHandler } from 'express';
import { CreateFaqDto } from './dtos/create-faq.dto';
import { UpdateFaqDto } from './dtos/update-faq.dto';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public createOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', CreateFaqDto, req, next);
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', UpdateFaqDto, req, next);
  };
}

export default new Validator();
