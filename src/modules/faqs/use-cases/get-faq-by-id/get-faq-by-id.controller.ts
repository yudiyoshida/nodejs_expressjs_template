import { Request, Response } from 'express';
import { container } from 'shared/ioc/inversify.config';
import { GetFaqByIdService } from './get-faq-by-id.service';

export class GetFaqByIdController {
  public async handle(req: Request, res: Response) {
    const getFaqByIdService = container.resolve(GetFaqByIdService);

    const result = await getFaqByIdService.execute(req.params.id);

    res.status(200).json(result);
  }
}
