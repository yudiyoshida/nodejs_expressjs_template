import { RequestHandler } from 'express';
import { Status } from '@prisma/client';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';

abstract class BaseValidator {
  protected readonly status: Status[];
  protected readonly pathSchema: yup.AnyObjectSchema;
  protected readonly querySchema: yup.AnyObjectSchema;

  constructor() {
    this.status = Object.values(Status);
    this.pathSchema = yup.object().shape({
      id: yup.number().positive().integer(),
    });
    this.querySchema = yup.object().shape({
      status: yup.string().oneOf(this.status),
      limit: yup.number().positive().integer(),
      page: yup.number().positive().integer(),
    });
  }

  protected validateSchema = async(schema: yup.AnyObjectSchema, dto: any) => {
    dto = await schema.validate(dto, { abortEarly: true });
    dto = await schema.cast(dto, { stripUnknown: true });
    return dto;
  };

  public pathParams: RequestHandler = async(req, res, next) => {
    try {
      req.params = await this.validateSchema(this.pathSchema, req.params);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public queryParams: RequestHandler = async(req, res, next) => {
    try {
      req.query = await this.validateSchema(this.querySchema, req.query);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    const schema = yup.object().shape({
      status: yup.string().required().oneOf(this.status),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };
}

export default BaseValidator;
