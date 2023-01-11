import { RequestHandler } from 'express';
import { Prisma, Status, UserType } from '@prisma/client';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';
import PasswordHelper from '@helpers/password';

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
      // Valida inputs do client.
      req.body = await this.validateSchema(schema, req.body);

      // Formata as informações antes de passar para o controller.
      req.body.password = PasswordHelper.generate();
      req.body.admin = this.formatAdminBody(req.body);
      req.body.permissions = this.formatPermissionBody(req.body.permissions);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  private formatAdminBody(body: any) {
    const admin: Prisma.UserCreateInput = {
      isAdmin: true,
      type: UserType.admin,
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

    return admin;
  }

  private formatPermissionBody(ids: number[]) {
    const permissions = ids.map((id) => {
      return { id };
    });

    return permissions;
  }
}

export default new Validator();
