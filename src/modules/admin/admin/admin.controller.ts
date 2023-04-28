import { RequestHandler } from 'express';
import { Status } from '@prisma/client';
import { CreateAdminOutputDto } from './dtos/create-admin.dto';
import { UpdateAdminOutputDto } from './dtos/update-admin.dto';

import Service from './admin.service';
import AdminPermissionService from '../admin-permission/admin-permission.service';

import StorageHelper from '@helpers/storage';
import Mail from '@libs/nodemailer';
import AppException from '@errors/app-exception';
import PaginationHelper from '@helpers/pagination';
import PasswordHelper from '@helpers/password';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, status } = req.query;

      const admins = await Service.findAll(+limit, +page, status as Status);
      const adminsPaginated = PaginationHelper.paginate(admins, +limit, +page);
      res.status(200).json(adminsPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findOne: RequestHandler = async(req, res, next) => {
    try {
      const { id } = req.params;

      const admin = await Service.findById(+id);
      res.status(200).json(admin);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  /*
    flow:
    - check for unique fields.
    - check for permissions' existence.
    - generate and hash password.
    - register new admin user.
    - send new email with password.
    - response.
  */
  public createAdmin: RequestHandler = async(req, res, next) => {
    try {
      const { permissions, ...data } = req.body as CreateAdminOutputDto;

      // Verifica se já existe um registro com os dados informados.
      await Service.findByUniqueFields(data);

      // Checa se as permissões existem.
      await this.checkIfPermissionsExists(permissions);

      // Cria senha aleatória.
      const password = PasswordHelper.generate();
      data.password = PasswordHelper.hash(password);

      // await StorageHelper.deleteFile(data.imageUrl);

      // Cadastra o novo usuário admin.
      const newAdmin = await Service.create(data, permissions);

      // Envio do email com a senha.
      // await Mail.sendEmail(newAdmin.email, '[name] - Aqui está sua senha de acesso!', 'new-admin-user', { password });
      res.status(201).json(newAdmin);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  /*
    flow:
    - check for admin's existence.
    - check for unique fields.
    - check for permissions' existence.
    - update admin user.
    - response.
  */
  public updateOne: RequestHandler = async(req, res, next) => {
    try {
      const { permissions, ...data } = req.body as UpdateAdminOutputDto;
      const { id } = req.params;

      // Verifica se existe um admin com o id informado.
      const admin = await Service.findById(+id);

      // Verifica se já existe um registro com os dados informados.
      await Service.findByUniqueFieldsExceptMe(+id, data);

      // Checa se as permissões existem.
      if (permissions) await this.checkIfPermissionsExists(permissions);

      // Atualiza o admin.
      const result = await Service.update(admin.id, data, permissions);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public deleteOne: RequestHandler = async(req, res, next) => {
    try {
      const { id } = req.params;

      const admin = await Service.findById(+id);
      await Service.delete(admin.id);
      res.sendStatus(204);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    try {
      const { id } = req.params;

      const admin = await Service.findById(+id);
      const result = await Service.updateStatus(admin.id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  private async checkIfPermissionsExists(permissions: Array<{ id: number }>) {
    const ids = permissions.map(permission => permission.id); // { id: number }[] => number[]
    await AdminPermissionService.checkIfPermissionsExists(ids);
  }
}

export default new Controller();
