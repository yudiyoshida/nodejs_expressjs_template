import { RequestHandler } from 'express';
import { ICreateAdminDTO } from './dtos/admin.dto';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public create: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<ICreateAdminDTO> = yup.object().shape({
      name: yup.string().trim().required(),
      birthday: yup.date().max(new Date()).required(),
      document: yup.string().trim().cpf().required(),
      phone: yup.string().trim().phone().required(),
      email: yup.string().trim().email().lowercase().required(),
      imageKey: yup.string(),
      imageUrl: yup.string().url(),
      permissions: yup.array().of(
        yup.number().positive().integer().required(),
      ).min(1).required(),
    });
    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.errors[0]));

    }
  };
}

export default new Validator();
