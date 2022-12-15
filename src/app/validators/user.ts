import { Request, Response, NextFunction } from 'express';

import yup from '@lib/yup';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PasswordHelper from '@helpers/password';
import BaseValidator from '@abstracts/validator';
import { UserType } from '@prisma/client';

// const today = new Date();

class UserValidator extends BaseValidator {
  constructor() {
    super();
  }

  public createUser = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
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
      image_key: yup.string().trim(),
      image_url: yup.string().trim().url(),
      // birthday: yup.date().formatDate().max(today).required(), //TODO: Fix it!
      phone: yup.string().trim().phone().required(),
      cpf: yup.string().trim().cpf().required(),
      confirm_password: yup.string().required(),
      password: yup.string().min(8).required(),
      email: yup.string().trim().email().lowercase().required(),
      name: yup.string().trim().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);

      if (PasswordHelper.compare(req.body.password, req.body.confirm_password)) next();
      else throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public uniqueFields = async(req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      phone: yup.string().trim().phone().required(),
      cnpj: yup.string().trim().cnpj().required(),
      cpf: yup.string().trim().cpf().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public queryParams = async(req: Request, res: Response, next: NextFunction) => {
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

export default new UserValidator();
