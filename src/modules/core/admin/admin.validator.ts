import { RequestHandler } from 'express';
import { Status, UserType } from '@prisma/client';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public create: RequestHandler = async(req, res, next) => {
    const schema = yup.object().shape({
      name: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
      phone: yup.string().trim().phone().required(),
      document: yup.string().trim().cpf().required(),
      birthday: yup.date().max(new Date()),
      imageUrl: yup.string().url(),
      imageKey: yup.string(),
      permissions: yup.array().of(
        yup.number().positive().integer().required(),
      ).min(1).required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      // Feita a validação dos dados informados pelo client-side,
      // é hora de definir alguns valores padrões do fluxo.

      req.body.isAdmin = true;
      req.body.type = UserType.admin;
      req.body.status = Status.ativo;
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };
}

export default new Validator();
