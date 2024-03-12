import { Request, Response } from 'express';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { container } from 'shared/ioc/inversify.config';
import { LoginDto } from './dtos/login.dto';
import { LoginService } from './login.service';

export class LoginController {
  @ValidateDto('body', LoginDto)
  public async handle(req: Request, res: Response) {
    const service = container.resolve(LoginService);

    const result = await service.execute(req.body);
    res.status(200).json(result);
  }
}
