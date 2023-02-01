import { RequestHandler } from 'express';
import { UserType } from '@prisma/client';

import { ICreateUserDTO } from './dtos/user.dto';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import BaseValidator from '@abstracts/validator';
import PasswordHelper from '@helpers/password';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public create: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<ICreateUserDTO> = yup.object().shape({
      address: yup.object({
        state: yup.string().trim().required(),
        city: yup.string().trim().required(),
        district: yup.string().trim().required(),
        reference: yup.string().trim(),
        complement: yup.string().trim(),
        number: yup.string().trim().required(),
        street: yup.string().trim().required(),
        zipcode: yup.string().trim().required(),
        nickname: yup.string().trim(),
      }),
      imageUrl: yup.string().trim().url(),
      imageKey: yup.string().trim(),
      passwordConfirmation: yup.string().required(),
      password: yup.string().min(8).required(),
      email: yup.string().trim().email().lowercase().required(),
      phone: yup.string().trim().phone().required(),
      document: yup.string().trim().cpf().required(),
      birthday: yup.date().max(new Date()).required(),
      name: yup.string().trim().required(),
      type: yup.string().trim().required().oneOf([UserType.app, UserType.web]),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      if (!PasswordHelper.compare(req.body.password, req.body.passwordConfirmation)) {
        throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);
      }
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public queryParams: RequestHandler = async(req, res, next) => {
    try {
      const schema = this.querySchema.shape({
        type: yup.string().trim().oneOf(Object.values(UserType)),
      });

      req.query = await this.validateSchema(schema, req.query);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };
}

export default new Validator();
