import Service from './text.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';
import { TextType } from '@prisma/client';

class Controller {
  @TryCatch()
  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(req.query.type as TextType);
    res.status(200).json(result);
  }

  public async updateOne(req: Request, res: Response) {
    const result = await Service.updateOne(req.query.type as TextType, req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
