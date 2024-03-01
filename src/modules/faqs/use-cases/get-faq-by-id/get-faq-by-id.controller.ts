import { Request, Response } from 'express';
import { container } from 'shared/ioc/inversify.config';
import { GetFaqByIdService } from './get-faq-by-id.service';

export class GetFaqByIdController {
  public async handle(req: Request, res: Response) {
    const service = container.resolve(GetFaqByIdService);

    const result = await service.execute(req.params.id);
    res.status(200).json(result);
  }
}
