import { RequestHandler } from 'express';
import { AccountStatus } from '@prisma/client';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

import Service from './admin.service';
import AdminPermissionService from '../admin-permission/admin-permission.service';

import Mail from '@libs/nodemailer';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination';
import PasswordHelper from '@helpers/password';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, status } = req.query;

      const admins = await Service.findAll(+limit, +page, status as AccountStatus);
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
  public createOne: RequestHandler = async(req, res, next) => {
    try {
      const { permissions, ...body } = req.body as CreateAdminDto;

      // check if there is an account with the data entered.
      const admin = await Service.findByUniqueFields(body);
      if (admin) throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);

      // check if permissions exists.
      await this.checkIfPermissionsExists(permissions);

      // generate random password.
      const password = PasswordHelper.generate();

      // define default values.
      const data = {
        ...body,
        password: PasswordHelper.hash(password),
        status: AccountStatus.ativo,
      };

      // register new admin user.
      const newAdmin = await Service.create(data, permissions);

      // send an email containing the random password.
      await Mail.sendEmail(newAdmin.email, '[name] - Aqui está sua senha de acesso!', 'new-admin-user', { password });
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
      const { permissions, ...data } = req.body as UpdateAdminDto;
      const { id } = req.params;

      // check if admin exists.
      const admin = await Service.findById(+id);

      // check if there is an account with the data entered.
      await Service.findByUniqueFieldsExceptMe(+id, data);

      // check if permissions exists.
      if (permissions) await this.checkIfPermissionsExists(permissions);

      // update admin user.
      const result = await Service.update(admin.id, data, permissions);
      res.status(200).json(result);

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

  private async checkIfPermissionsExists(permissions: Array<{ id: number }>) {
    const ids = permissions.map(permission => permission.id); // { id: number }[] => number[]
    await AdminPermissionService.checkIfPermissionsExists(ids);
  }
}

export default new Controller();
