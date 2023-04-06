import { RequestHandler } from 'express';
import { Status } from '@prisma/client';
import { CreateAdminAccountOutputDto } from './dtos/create-admin';

import Service from './admin.service';
import AdminPermissionService from '../admin-permission/admin-permission.service';

// import Mail from '@libs/nodemailer';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination';
import PasswordHelper from '@helpers/password';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, status } = req.query;

      const result = await Service.findAll(Number(limit), Number(page), status as Status);
      const resultPaginated = PaginationHelper.paginate(result, Number(limit), Number(page));
      res.status(200).json(resultPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  // public findById: RequestHandler = async(req, res, next) => {
  //   try {
  //     const result = await Service.findById(Number(req.params.id));
  //     if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
  //     else res.status(200).json(result);

  //   } catch (err: any) {
  //     next(new AppException(err.status ?? 500, err.message));

  //   }
  // };

  /*
    flow:
    - check for unique fields.
    - check for permissions existence.
    - generate and hash password.
    - register new admin user.
    - send new email with password.
    - response.
  */
  public createAdminAccount: RequestHandler = async(req, res, next) => {
    try {
      const { permissions, ...data } = req.body as CreateAdminAccountOutputDto;

      // Verifica se já existe um registro.
      const account = await Service.findByUniqueFields(data);
      if (account) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Checa se as permissões existem.
      const ids = permissions.map(permission => permission.id); // { id: number }[] => number[]
      await AdminPermissionService.checkIfPermissionsExists(ids);

      // Cria senha aleatória.
      const password = PasswordHelper.generate();
      data.password = PasswordHelper.hash(password);

      // Cadastra o novo usuário admin.
      const result = await Service.create(data, permissions);

      // Envio do email com a senha.
      // await Mail.sendEmail(data.email, '[name] - Aqui está sua senha de acesso!', 'new-admin-user', { password });
      res.status(201).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  // public update: RequestHandler = async(req, res, next) => {
  //   try {
  //     const { admin, permissions } = AdminFactory.updateAdmin(req.body);

  //     // Verifica se o usuário admin existe.
  //     const adminExists = await Service.findById(Number(req.params.id));
  //     if (!adminExists) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

  //     // Verifica se já existe um registro.
  //     const account = await AuthService.findByUniqueFieldsExceptMe(Number(req.params.id), admin);
  //     if (account) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

  //     // Checa se as permissões existem.
  //     await this.checkIfPermissionsExists(permissions);

  //     // Atualiza o usuário admin.
  //     const result = await Service.update(adminExists.id, admin, permissions);
  //     res.status(200).json(result);

  //   } catch (err: any) {
  //     next(new AppException(err.status ?? 500, err.message));

  //   }
  // };

  // public delete: RequestHandler = async(req, res, next) => {
  //   try {
  //     const admin = await Service.findById(Number(req.params.id));
  //     if (!admin) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

  //     await Service.delete(admin.id);
  //     res.sendStatus(204);

  //   } catch (err: any) {
  //     next(new AppException(err.status ?? 500, err.message));

  //   }
  // };

  // public updateStatus: RequestHandler = async(req, res, next) => {
  //   try {
  //     const admin = await Service.findById(Number(req.params.id));
  //     if (!admin) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

  //     const result = await Service.updateStatus(admin.id, req.body.status);
  //     res.status(200).json(result);

  //   } catch (err: any) {
  //     next(new AppException(err.status ?? 500, err.message));

  //   }
  // };
}

export default new Controller();
