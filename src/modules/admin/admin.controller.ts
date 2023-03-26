import { RequestHandler } from 'express';
import { Status } from '@prisma/client';

import { IAdminPermissionIdDTO } from '../admin-permission/dtos/admin-permission';

import AdminFactory from './admin.factory';
import Service from './admin.service';
import AuthService from '../auth/auth.service';
import PermissionService from '../admin-permission/admin-permission.service';

import Mail from '@libs/nodemailer';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination';

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

  public findById: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findById(Number(req.params.id));
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      else res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public create: RequestHandler = async(req, res, next) => {
    try {
      const { admin, permissions, password } = AdminFactory.createAdmin(req.body);

      // Verifica se já existe um registro.
      const account = await AuthService.findByUniqueFields(admin);
      if (account) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Checa se as permissões existem.
      await this.checkIfPermissionsExists(permissions);

      // Cadastra o novo usuário admin.
      const result = await Service.create(admin, permissions);

      // Envio do email com a senha.
      await Mail.sendEmail(admin.email, '[name] - Aqui está sua senha de acesso!', 'new-admin-user', { password });
      res.status(201).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public update: RequestHandler = async(req, res, next) => {
    try {
      const { admin, permissions } = AdminFactory.updateAdmin(req.body);

      // Verifica se o usuário admin existe.
      const adminExists = await Service.findById(Number(req.params.id));
      if (!adminExists) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      // Verifica se já existe um registro.
      const account = await AuthService.findByUniqueFieldsExceptMe(Number(req.params.id), admin);
      if (account) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Checa se as permissões existem.
      await this.checkIfPermissionsExists(permissions);

      // Atualiza o usuário admin.
      const result = await Service.update(adminExists.id, admin, permissions);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public delete: RequestHandler = async(req, res, next) => {
    try {
      const admin = await Service.findById(Number(req.params.id));
      if (!admin) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      await Service.delete(admin.id);
      res.sendStatus(204);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    try {
      const admin = await Service.findById(Number(req.params.id));
      if (!admin) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const result = await Service.updateStatus(admin.id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  private async checkIfPermissionsExists(permissions: IAdminPermissionIdDTO[]) {
    await Promise.all(
      permissions.map(async(item) => {
        const permission = await PermissionService.findById(item.id);
        if (!permission) throw new AppException(404, ErrorMessages.PERMISSION_NOT_FOUND);
      }),
    );
  }
}

export default new Controller();
