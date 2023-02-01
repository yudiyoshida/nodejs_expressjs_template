import { RequestHandler } from 'express';
import {
  IForgotPasswordDTO,
  ILoginDTO,
  IResetPasswordDTO,
  IUpdatePasswordDTO,
  IValidateCodeDTO,
  IValidateFieldsDTO,
} from './dtos/auth.dto';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import BaseValidator from '@abstracts/validator';
import PasswordHelper from '@helpers/password';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public login: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<ILoginDTO> = yup.object().shape({
      password: yup.string().required(),
      username: yup.string().trim().lowercase().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public forgotPassword: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IForgotPasswordDTO> = yup.object().shape({
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public resetPassword: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IResetPasswordDTO> = yup.object().shape({
      passwordConfirmation: yup.string().required(),
      password: yup.string().min(8).required(),
      code: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
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

  public updatePassword: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IUpdatePasswordDTO> = yup.object().shape({
      passwordConfirmation: yup.string().required(),
      newPassword: yup.string().min(8).required(),
      currentPassword: yup.string().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      const { newPassword, passwordConfirmation } = req.body;
      if (PasswordHelper.compare(newPassword, passwordConfirmation)) next();
      else throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public validateFields: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IValidateFieldsDTO> = yup.object().shape({
      phone: yup.string().trim().phone().required(),
      email: yup.string().trim().email().lowercase().required(),
      document: yup.string().trim().cpf().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public validateCode: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IValidateCodeDTO> = yup.object().shape({
      code: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
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
