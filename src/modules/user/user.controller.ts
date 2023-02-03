import { RequestHandler } from 'express';
import { Prisma, Status, UserType } from '@prisma/client';

import { ICreateUserDTO } from './dtos/user.dto';

import Service from './user.service';
import AuthService from '../auth/auth.service';
import SecurityService from '../security/security.service';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination';
import PasswordHelper from '@helpers/password';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, type, status } = req.query;

      // Se for admin, serão exibidos users ativos e inativos.
      // Caso contrário, só serão exibidos users ativos.
      const result = (req.auth.isAdmin)
        ? await Service.findAll(Number(limit), Number(page), type as UserType, status as Status)
        : await Service.findAll(Number(limit), Number(page), type as UserType, Status.ativo);

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

  public findMyself: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findById(req.auth.id);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public create: RequestHandler = async(req, res, next) => {
    try {
      const { user, address } = this.createUserData(req.body);

      // Verifica se o email foi validado.
      const email = await SecurityService.findByValidatedEmail(user.email);
      if (!email) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);
      if (!email.validated) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);

      // Verifica se já existe um registro.
      const userExists = await AuthService.findByUniqueFields(user);
      if (userExists) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Cadastra o novo usuário.
      const result = await Service.create(user, address);
      res.status(201).json(result[0]);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    try {
      const user = await Service.findById(Number(req.params.id));
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const result = await Service.updateStatus(user.id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  private createUserData(body: ICreateUserDTO) {
    const user: Prisma.UserCreateInput = {
      isAdmin: false,
      type: body.type as UserType,
      name: body.name,
      birthday: body.birthday,
      document: body.document,
      phone: body.phone,
      email: body.email,
      password: PasswordHelper.hash(body.password),
      status: Status.ativo,
      imageKey: body.imageKey,
      imageUrl: body.imageUrl,
    };

    const address: Prisma.AddressCreateInput = {
      nickname: body.address.nickname,
      zipcode: body.address.zipcode,
      street: body.address.street,
      number: body.address.number,
      complement: body.address.complement,
      reference: body.address.reference,
      district: body.address.district,
      city: body.address.city,
      state: body.address.state,
    };

    return { user, address };
  }
}

export default new Controller();
