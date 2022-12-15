import { RequestHandler } from 'express';
import { Status, UserType } from '@prisma/client';
import { IConnectAdminPermission } from '../admin-permission/dtos/interfaces/admin-permission.dto';
import { AdminOmitFields, AdminWithPermissions } from './dtos/types/admin.dto';

import Service from './admin.service';
import PermissionService from '../admin-permission/admin-permission.service';
import AuthService from '../auth/auth.service';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import Mail from '@libs/nodemailer';
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

  public findById: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findById(Number(req.params.id), AdminWithPermissions);
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      else res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public create: RequestHandler = async(req, res, next) => {
    try {
      // Verifica se já existe um registro.
      const user = await AuthService.findByUniqueFields(req.body);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Tratamento das permissões do novo admin.
      const permissions = await this.checkPermissions(req.body.permissions);
      delete req.body.permissions;

      // Valores padrões.
      const pass = PasswordHelper.generate();
      req.body.isAdmin = true;
      req.body.type = UserType.admin;
      req.body.status = Status.ativo;
      req.body.password = PasswordHelper.hash(pass);

      // Cadastra o novo usuário admin.
      const result = await Service.create(req.body, permissions);

      // Envio do email com a senha.
      await Mail.sendEmail(req.body.email, '[name] - Aqui está sua senha de acesso!', 'new-admin-user', { pass });
      res.status(201).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    try {
      const admin = await Service.findById(Number(req.params.id), AdminOmitFields);
      if (!admin) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const result = await Service.updateStatus(admin.id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  private async checkPermissions(permissions: number[]) {
    const result: IConnectAdminPermission[] = [];
    await Promise.all(
      permissions.map(async(item) => {
        const permission = await PermissionService.findById(item);
        if (!permission) throw new AppException(404, ErrorMessages.PERMISSION_NOT_FOUND);
        result.push({ id: item });
      }),
    );

    return result;
  }
}

export default new Controller();
