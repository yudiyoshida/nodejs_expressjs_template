import { RequestHandler } from 'express';
import { ICreateFaq } from './dtos/interfaces/faq.dto';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public upsert: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<ICreateFaq> = yup.object().shape({
      answer: yup.string().trim().required(),
      question: yup.string().trim().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };
}

export default new Validator();
