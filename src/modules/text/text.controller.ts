import Service from './text.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';
import { RequestTextTypeDto } from './dtos/request-text-type.dto';

class Controller {
  @TryCatch()
  public async findOne(req: Request, res: Response) {
    const { type } = req.query as RequestTextTypeDto;

    const result = await Service.findOne(type);
    res.status(200).json(result);
  }

  @TryCatch()
  public async updateOne(req: Request, res: Response) {
    const { type } = req.query as RequestTextTypeDto;

    const result = await Service.updateOne(type, req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
