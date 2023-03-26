import { RequestHandler } from 'express';
import { UserType } from '@prisma/client';

import { ICreateUserDTO, IUpdateUserDTO } from './dtos/user.dto';

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
      type: yup.string().trim().required().oneOf([UserType.app, UserType.web]),
      name: yup.string().trim().required(),
      birthday: yup.date().max(new Date()).required(),
      document: yup.string().trim().cpf().required(),
      phone: yup.string().trim().phone().required(),
      email: yup.string().trim().email().lowercase().required(),
      password: yup.string().min(8).required(),
      passwordConfirmation: yup.string().required(),
      imageKey: yup.string().trim(),
      imageUrl: yup.string().trim().url(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      const { password, passwordConfirmation } = req.body;
      if (PasswordHelper.compare(password, passwordConfirmation)) next();
      else throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public updateMyself: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IUpdateUserDTO> = yup.object().shape({
      name: yup.string().trim().required(),
      birthday: yup.date().max(new Date()).required(),
      document: yup.string().trim().cpf().required(),
      phone: yup.string().trim().phone().required(),
      email: yup.string().trim().email().lowercase().required(),
      imageKey: yup.string().trim(),
      imageUrl: yup.string().trim().url(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
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
