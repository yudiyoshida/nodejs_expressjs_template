// import { RequestHandler } from 'express';
import { Status } from '@prisma/client';
import { z } from 'zod';

abstract class BaseValidator {
  protected readonly pathSchema;
  protected readonly querySchema;

  constructor() {
    this.pathSchema = z.object({
      id: z.number().positive().int(),
    });
    this.querySchema = z.object({
      status: z.nativeEnum(Status).optional(),
      limit: z.number().positive().int().optional(),
      page: z.number().positive().int().optional(),
    });
  }

  protected validateSchema = (schema: z.Schema, value: any) => {
    return schema.parse(value);
  };

  // public pathParams: RequestHandler = async(req, res, next) => {
  //   try {
  //     req.params = await this.validateSchema(this.pathSchema, req.params);
  //     next();

  //   } catch (err: any) {
  //     next(new AppException(400, err.message));

  //   }
  // };

  // public queryParams: RequestHandler = async(req, res, next) => {
  //   try {
  //     req.query = await this.validateSchema(this.querySchema, req.query);
  //     next();

  //   } catch (err: any) {
  //     next(new AppException(400, err.message));

  //   }
  // };

  // public updateStatus: RequestHandler = async(req, res, next) => {
  //   const schema = yup.object().shape({
  //     status: yup.string().trim().required().oneOf(this.status),
  //   });

  //   try {
  //     req.body = await this.validateSchema(schema, req.body);
  //     next();

  //   } catch (err: any) {
  //     next(new AppException(400, err.message));

  //   }
  // };
}

export default BaseValidator;
