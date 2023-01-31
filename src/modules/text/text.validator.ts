import { RequestHandler } from 'express';
import { TextType } from '@prisma/client';

import { IUpdateTextDTO } from './dtos/text.dto';

import yup from '@libs/yup';
import AppException from '@errors/app-exception';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public update: RequestHandler = async(req, res, next) => {
    const schema: yup.SchemaOf<IUpdateTextDTO> = yup.object().shape({
      content: yup.string().trim().required(),
    });

    try {
      req.body = await this.validateSchema(schema, req.body);
      next();

    } catch (err: any) {
      next(new AppException(400, err.inner[0].message));

    }
  };

  public queryParams: RequestHandler = async(req, res, next) => {
    const schema = yup.object().shape({
      type: yup.string().trim().required().oneOf(Object.values(TextType)),
    });

    try {
      req.query = await this.validateSchema(schema, req.query);
      next();

    } catch (err: any) {
      next(new AppException(400, err.inner[0].message));

    }
  };
}

export default new Validator();
