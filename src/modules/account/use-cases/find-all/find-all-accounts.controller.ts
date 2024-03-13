import { Request, Response } from 'express';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { QueriesDto } from 'shared/dtos/queries/queries.dto';
import { container } from 'shared/ioc/inversify.config';
import { FindAllAccountsService } from './find-all-accounts.service';

export class FindAllAccountsController {
  @ValidateDto('query', QueriesDto)
  public async handle(req: Request, res: Response) {
    const service = container.resolve(FindAllAccountsService);

    const result = await service.execute(req.query);
    res.status(200).json(result);
  }
}
