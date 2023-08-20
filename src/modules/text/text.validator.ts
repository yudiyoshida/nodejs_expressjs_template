import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { TextType } from '@prisma/client';
import { UpdateText } from './dtos/update-text.dto';
import { z } from 'zod';

class Validator extends BaseValidator {
  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateText);
  };

  public queryParams: RequestHandler = (req, res, next) => {
    const schema = z.object({
      type: z.nativeEnum(TextType),
    });

    this.validateSchema(req, next, 'query', schema);
  };
}

export default new Validator();
