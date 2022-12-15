import { RequestHandler } from 'express';
import { ICreateAdmin } from './dtos/interfaces/admin.dto';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public create: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<ICreateAdmin> = yup.object().shape({
      permissions: yup.array().of(
        yup.number().positive().integer().required(),
      ).min(1).required(),
      imageKey: yup.string(),
      imageUrl: yup.string().url(),
      birthday: yup.date().max(new Date()),
      document: yup.string().trim().cpf().required(),
      phone: yup.string().trim().phone().required(),
      password: yup.string().min(8).required(),
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
