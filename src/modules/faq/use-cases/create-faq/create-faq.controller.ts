import { Request, Response } from 'express';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { container } from 'shared/ioc/inversify.config';
import { CreateFaqService } from './create-faq.service';
import { CreateFaqDto } from './dtos/create-faq.dto';

export class CreateFaqController {
  @ValidateDto('body', CreateFaqDto)
  public async handle(req: Request, res: Response) {
    const service = container.resolve(CreateFaqService);

    const result = await service.execute(req.body);
    res.status(201).json(result);
  }
}
