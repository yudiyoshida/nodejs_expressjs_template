import { RequestHandler } from 'express';
import { Status } from '@prisma/client';
import { IAdminPermissionId } from '@interfaces/admin-permission.dto';
import { AdminOmitSensitiveFieldsDTO, AdminWithPermissionsDTO } from './dtos/admin.dto';

import Service from './admin.service';
import AuthService from '../auth/auth.service';
import PermissionService from '../admin-permission/admin-permission.service';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import Mail from '@libs/nodemailer';
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
      const result = await Service.findById(Number(req.params.id), AdminWithPermissionsDTO);
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      else res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public create: RequestHandler = async(req, res, next) => {
    try {
      const { admin, permissions, password } = req.body;

      // Verifica se já existe um registro.
      const user = await AuthService.findByUniqueFields(admin);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Checa se as permissões existem.
      await this.checkPermissions(permissions);

      // Cadastra o novo usuário admin.
      const result = await Service.create(admin, permissions);

      // Envio do email com a senha.
      await Mail.sendEmail(req.body.email, '[name] - Aqui está sua senha de acesso!', 'new-admin-user', { password });
      res.status(201).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    try {
      const admin = await Service.findById(Number(req.params.id), AdminOmitSensitiveFieldsDTO);
      if (!admin) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const result = await Service.updateStatus(admin.id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  private async checkPermissions(permissions: IAdminPermissionId[]) {
    await Promise.all(
      permissions.map(async(item) => {
        const permission = await PermissionService.findById(item.id);
        if (!permission) throw new AppException(404, ErrorMessages.PERMISSION_NOT_FOUND);
      }),
    );
  }
}

export default new Controller();
