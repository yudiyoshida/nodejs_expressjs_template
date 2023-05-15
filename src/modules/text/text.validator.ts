import { RequestHandler } from 'express';
import { z } from 'zod';
import { UpdateText } from './dtos/update-text.dto';
import { TextType } from '@prisma/client';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public updateOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', UpdateText, req, next);
  };

  public queryParams: RequestHandler = async(req, res, next) => {
    const schema = z.object({
      type: z.nativeEnum(TextType),
    });

    this.validateSchema('query', schema, req, next);
  };
}

export default new Validator();
