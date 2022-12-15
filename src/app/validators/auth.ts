import { Request, Response, NextFunction } from 'express';

import yup from '@lib/yup';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PasswordHelper from '@helpers/password';
import BaseValidator from '@abstracts/validator';

class AuthValidator extends BaseValidator {
  constructor() {
    super();
  }

  public login = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
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

  public forgotPassword = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public resetPassword = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      confirm_password: yup.string().required(),
      password: yup.string().min(8).required(),
      code: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      const { password, confirm_password } = req.body;
      if (!PasswordHelper.compare(password, confirm_password)) throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);
      else next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public updatePassword = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      confirm_password: yup.string().required(),
      new_password: yup.string().min(8).required(),
      current_password: yup.string().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      if (PasswordHelper.compare(req.body.new_password, req.body.confirm_password)) next();
      else throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public validateFields = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
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

  public validateCode = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
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

export default new AuthValidator();
