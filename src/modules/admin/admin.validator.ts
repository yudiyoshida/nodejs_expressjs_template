import { RequestHandler } from 'express';
import { IUpsertAdminDTO } from './dtos/admin.dto';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public upsert: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IUpsertAdminDTO> = yup.object().shape({
      permissions: yup.array().of(
        yup.number().positive().integer().required(),
      ).min(1).required(),
      imageUrl: yup.string().url(),
      imageKey: yup.string(),
      email: yup.string().trim().email().lowercase().required(),
      phone: yup.string().trim().phone().required(),
      document: yup.string().trim().cpf().required(),
      birthday: yup.date().max(new Date()).required(),
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
