import { RequestHandler } from 'express';
import { Prisma, Status, UserType } from '@prisma/client';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import BaseValidator from 'utils/abstracts/validator';
import PasswordHelper from 'shared/helpers/password';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public create: RequestHandler = async(req, res, next) => {
    const schema = yup.object().shape({
      type: yup.string().trim().required().oneOf([UserType.app, UserType.web]),
      name: yup.string().trim().required(),
      email: yup.string().trim().email().lowercase().required(),
      phone: yup.string().trim().phone().required(),
      document: yup.string().trim().cpf().required(),
      birthday: yup.date().max(new Date()),
      password: yup.string().min(8).required(),
      confirmPassword: yup.string().required(),
      imageUrl: yup.string().trim().url(),
      imageKey: yup.string().trim(),
      address: yup.object({
        nickname: yup.string().trim(),
        zipcode: yup.string().trim().required(),
        street: yup.string().trim().required(),
        number: yup.string().trim().required(),
        complement: yup.string().trim(),
        reference: yup.string().trim(),
        district: yup.string().trim().required(),
        city: yup.string().trim().required(),
        state: yup.string().trim().required(),
      }),
    });

    try {
      // Valida inputs do client.
      req.body = await this.validateSchema(schema, req.body);

      if (!PasswordHelper.compare(req.body.password, req.body.confirmPassword)) {
        throw new AppException(400, ErrorMessages.PASSWORDS_MUST_MATCH);
      }

      // Formata as informações antes de passar para os controllers.
      req.body.user = this.formatUserBody(req.body);
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

  private formatUserBody(body: any) {
    const user: Prisma.UserCreateInput = {
      isAdmin: false,
      type: body.type,
      name: body.name,
      email: body.email,
      password: PasswordHelper.hash(body.password),
      status: Status.ativo,
      phone: body.phone,
      document: body.document,
      birthday: body.birthday,
      imageUrl: body.imageUrl,
      imageKey: body.imageKey,
    };

    return user;
  }
}

export default new Validator();
