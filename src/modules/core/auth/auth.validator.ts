import { RequestHandler } from 'express';
import { ILogin } from './dtos/interfaces/login.dto';
import { IForgotPassword, IResetPassword, IUpdatePassword } from './dtos/interfaces/password.dto';
import { IValidateFields, IValidateCode } from './dtos/interfaces/register.dto';

import yup from '@libs/yup';
import PasswordHelper from '@helpers/password';

import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';
import ErrorMessages from '@errors/error-messages';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public login: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<ILogin> = yup.object().shape({
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
    const schema: yup.SchemaOf<IForgotPassword> = yup.object().shape({
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
    const schema: yup.SchemaOf<IResetPassword> = yup.object().shape({
      confirmPassword: yup.string().required(),
      password: yup.string().min(8).required(),
      code: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      const { password, confirmPassword } = req.body;
      if (PasswordHelper.compare(password, confirmPassword)) next();
      else throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public updatePassword: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IUpdatePassword> = yup.object().shape({
      confirmPassword: yup.string().required(),
      newPassword: yup.string().min(8).required(),
      currentPassword: yup.string().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      const { newPassword, confirmPassword } = req.body;
      if (PasswordHelper.compare(newPassword, confirmPassword)) next();
      else throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public validateFields: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IValidateFields> = yup.object().shape({
      phone: yup.string().trim().phone().required(),
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public validateCode: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IValidateCode> = yup.object().shape({
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
