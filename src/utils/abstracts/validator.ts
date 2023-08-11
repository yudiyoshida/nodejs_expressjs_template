import { NextFunction, Request, Response } from 'express';
import { RequestPropertyType } from '@customTypes/request.type';
import { AccountStatus } from '@prisma/client';
import { z } from 'zod';

import AppException from '@errors/app-exception';

abstract class BaseValidator {
  protected readonly pathSchema;
  protected readonly querySchema;
  protected readonly updateStatusSchema;

  constructor() {
    this.pathSchema = z.object({
      id: z.coerce.number().positive().int(),
    });
    this.querySchema = z.object({
      limit: z.coerce.number().positive().int().optional(),
      page: z.coerce.number().positive().int().optional(),
      search: z.string().optional(),
      status: z.nativeEnum(AccountStatus).optional(),
    });
    this.updateStatusSchema = z.object({
      status: z.enum([AccountStatus.ativo, AccountStatus.inativo]),
    });
  }

  private zodValidation<T extends z.ZodTypeAny>(schema: T, value: any) {
    return schema.parse(value);
  }

  protected validateSchema(req: Request, next: NextFunction, property: RequestPropertyType, schema: z.ZodTypeAny) {
    try {
      req[property] = this.zodValidation(schema, req[property]);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  }

  public pathParams(req: Request, res: Response, next: NextFunction) {
    this.validateSchema(req, next, 'params', this.pathSchema);
  }

  public queryParams(req: Request, res: Response, next: NextFunction) {
    this.validateSchema(req, next, 'query', this.querySchema);
  }

  public updateStatus(req: Request, res: Response, next: NextFunction) {
    this.validateSchema(req, next, 'body', this.updateStatusSchema);
  }
}

export default BaseValidator;
