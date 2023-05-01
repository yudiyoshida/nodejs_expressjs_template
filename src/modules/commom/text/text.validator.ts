import { RequestHandler } from 'express';
import { z } from 'zod';
import { TextType } from '@prisma/client';
import BaseValidator from '@abstracts/validator';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public queryParams: RequestHandler = async(req, res, next) => {
    const schema = z.object({
      type: z.nativeEnum(TextType),
    });

    this.validateSchema('query', schema, req, next);
  };
}

export default new Validator();
