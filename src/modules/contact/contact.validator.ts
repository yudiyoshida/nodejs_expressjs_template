import { RequestHandler } from 'express';
import { ISendEmailDTO } from './dtos/contact.dto';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public sendEmail: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<ISendEmailDTO> = yup.object().shape({
      message: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
      name: yup.string().trim().required(),
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
