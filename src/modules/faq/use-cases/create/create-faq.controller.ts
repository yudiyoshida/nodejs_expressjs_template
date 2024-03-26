import { Request, Response } from 'express';
import { RequiredPermission } from 'shared/decorators/authentication.decorator';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { PermissionEnum } from 'shared/guards/authentication.guard';
import { container } from 'shared/ioc/inversify.config';
import { CreateFaqService } from './create-faq.service';
import { CreateFaqInputDto } from './dtos/create-faq.dto';

export class CreateFaqController {
  @RequiredPermission(PermissionEnum.CREATE_FAQ)
  @ValidateDto('body', CreateFaqInputDto)
  public async handle(req: Request, res: Response): Promise<void> {
    const service = container.resolve(CreateFaqService);

    const result = await service.execute(req.body);
    res.status(201).json(result);
  }
}
