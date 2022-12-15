import { Request, Response, NextFunction } from 'express';
import { Status, User, UserType } from '@prisma/client';

import AdminService from '@services/admin';
import UserService from '@services/user';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import Mail from '@lib/nodemailer';
import PaginationHelper from '@helpers/pagination';
import PasswordHelper from '@helpers/password';
import { ConnectPermission } from '@interfaces/permission';

class AdminController {
  private async checkPermissions(permissions: number[]) {
    const result = new Array<{ id: number }>;
    await Promise.all(
      permissions.map(async(item) => {
        const permission = await AdminService.findById(item);
        if (!permission) throw new AppException(404, ErrorMessages.PERMISSION_NOT_FOUND);
        result.push({ id: item });
      }),
    );

    return result;
  }

  public findAllPermissions = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AdminService.findAll();
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit = 10, page = 1, status } = req.query;

      const result = await UserService.findAllAdmins(Number(limit), Number(page), status as Status);
      const resultPaginated = PaginationHelper.paginate(result, Number(limit), Number(page));
      res.status(200).json(resultPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findById = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.findAdminById(Number(req.params.id)); //TODO: interface req.params.
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      else res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public createAdmin = async(req: Request, res: Response, next: NextFunction) => {
    try {
      // Verifica se já existe um registro.
      const user = await UserService.findByUniqueFields(req.body);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Tratamento das permissões do novo admin.
      const permissions: ConnectPermission[] = await this.checkPermissions(req.body.permissions);
      delete req.body.permissions;

      const pass = PasswordHelper.generate();
      req.body.is_admin = true;
      req.body.type = UserType.admin;
      req.body.status = Status.ativo;
      req.body.password = PasswordHelper.hash(pass);

      // Remove alguns campos e retorna o novo usuário admin.
      const result = await UserService.createAdmin(req.body, permissions);

      // Envio do email com a senha.
      await Mail.sendEmail(req.body.email, '[name] - Aqui está sua senha de acesso!', 'new-admin-user', { pass });
      res.status(201).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await UserService.findAdminById(Number(req.params.id));
      if (!admin) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const result = await UserService.updateStatus((admin as User).id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new AdminController();
