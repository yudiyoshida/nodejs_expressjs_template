import { Request, Response } from 'express';
import { container } from 'src/shared/ioc/inversify.config';
import { CreateFaqService } from './create-faq.service';

export class CreateFaqController {
  public async handle(req: Request, res: Response) {
    const service = container.resolve(CreateFaqService);

    const result = await service.execute(req.body);
    res.status(201).json(result);
  }
}
