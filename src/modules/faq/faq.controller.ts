import Service from './faq.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';

class Controller {
  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const { limit, page, search } = req.query;

    let result;
    if (page && limit) {
      result = await Service.findAll(+limit, +page, search as string);

    } else {
      result = await Service.findAllNoPagination(search as string);

    }
    res.status(200).json(result);
  }

  @TryCatch()
  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(+req.params.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async createOne(req: Request, res: Response) {
    const result = await Service.createOne(req.body);
    res.status(201).json(result);
  }

  @TryCatch()
  public async updateOne(req: Request, res: Response) {
    const result = await Service.updateOne(+req.params.id, req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async deleteOne(req: Request, res: Response) {
    const result = await Service.deleteOne(+req.params.id);
    res.status(200).json(result);
  }
}

export default new Controller();
