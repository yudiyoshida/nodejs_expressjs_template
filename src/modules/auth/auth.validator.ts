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
      username: yup.string().trim().lowercase().required(),
      password: yup.string().required(),
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
      email: yup.string().trim().email().lowercase().required(),
      code: yup.string().trim().required(),
      password: yup.string().min(8).required(),
      passwordConfirmation: yup.string().required(),
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
      currentPassword: yup.string().required(),
      newPassword: yup.string().min(8).required(),
      passwordConfirmation: yup.string().required(),
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
      document: yup.string().trim().cpf().required(),
      email: yup.string().trim().email().lowercase().required(),
      phone: yup.string().trim().phone().required(),
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
      email: yup.string().trim().email().lowercase().required(),
      code: yup.string().trim().required(),
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
