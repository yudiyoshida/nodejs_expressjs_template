import Repository from './admin.repository';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { AccountStatus } from '@prisma/client';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

import PaginationHelper from '@helpers/pagination';
import PasswordHelper from '@helpers/password';

import AdminPermissionService from '../admin-permission/admin-permission.service';
import MailService from '../mail/mail.service';

class Service {
  public async findAll(limit: number, page: number, status?: AccountStatus) {
    const admins = await Repository.findAll(limit, page, status);

    return PaginationHelper.paginate(admins, limit, page);
  }

  public async findById(id: number) {
    const admin = await Repository.findById(id);

    if (!admin) throw new AppException(404, ErrorMessages.ADMIN_NOT_FOUND);
    else return admin;
  }

  public async createOne(data: CreateAdminDto) {
    const { permissions, ...body } = data;

    // check if there's an admin account with data provided.
    await this.checkUniqueFields(data.email);

    // check if permissions exists.
    await AdminPermissionService.checkIfPermissionsExists(data.permissions);

    // generate random password.
    const password = PasswordHelper.generate();

    // define default values.
    const adminBody = {
      ...body,
      password: PasswordHelper.hash(password),
      status: AccountStatus.ativo,
    };

    // register new admin user and send an email containing the random password.
    const newAdmin = await Repository.createOne(adminBody, permissions);
    await MailService.sendNewAdminAccountEmail(newAdmin.email, { password });

    return newAdmin;
  }

  public async updateOne(id: number, data: UpdateAdminDto) {
    const { permissions, ...body } = data;

    // check if admin exists.
    const admin = await this.findById(id);

    // check if there's an admin account with data provided (excluding the data from the admin that will be updated).
    await this.checkUniqueFieldsExcludingMyself(id, body.email);

    // check if permissions exists.
    if (permissions) await AdminPermissionService.checkIfPermissionsExists(permissions);

    // update admin user.
    return await Repository.updateOne(admin.id, body, permissions);
  }

  public async updateStatus(id: number, status: AccountStatus) {
    const admin = await this.findById(id);

    return await Repository.updateStatus(admin.id, status);
  }

  public async deleteOne(id: number) {
    const admin = await this.findById(id);

    return await Repository.deleteOne(admin.id);
  }

  public async checkUniqueFields(email: string) {
    const account = await Repository.findByUniqueFields(email);
    if (account) throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
  }

  public async checkUniqueFieldsExcludingMyself(id: number, email: string) {
    const account = await Repository.findByUniqueFields(email, id);
    if (account) throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
  }
}

export default new Service();
