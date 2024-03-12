import { Request, Response } from 'express';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { container } from 'shared/ioc/inversify.config';
import { CreateAccountService } from './create-account.service';
import { CreateAccountInputDto } from './dtos/create-account-input.dto';

export class CreateAccountController {
  @ValidateDto('body', CreateAccountInputDto)
  public async handle(req: Request, res: Response) {
    const service = container.resolve(CreateAccountService);

    const result = await service.execute(req.body);
    res.status(201).json(result);
  }
}
