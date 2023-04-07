import { RequestHandler } from 'express';
import { Status } from '@prisma/client';
import { z } from 'zod';

import AppException from '@errors/app-exception';

abstract class BaseValidator {
  protected readonly pathSchema;
  protected readonly querySchema;
  protected readonly statusSchema;

  constructor() {
    this.pathSchema = z.object({
      id: z.coerce.number().positive().int(),
    });
    this.querySchema = z.object({
      status: z.nativeEnum(Status).optional(),
      limit: z.coerce.number().positive().int().optional(),
      page: z.coerce.number().positive().int().optional(),
    });
    this.statusSchema = z.object({
      status: z.nativeEnum(Status),
    });
  }

  protected validateSchema = <T extends z.ZodTypeAny>(schema: T, value: any) => {
    return schema.parse(value);
  };

  public pathParams: RequestHandler = async(req, res, next) => {
    try {
      req.params = await this.validateSchema(this.pathSchema, req.params);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  };

  public queryParams: RequestHandler = async(req, res, next) => {
    try {
      req.query = await this.validateSchema(this.querySchema, req.query);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    try {
      req.body = await this.validateSchema(this.statusSchema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.message));

    }
  };
}

export default BaseValidator;
