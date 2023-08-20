import AdminService from './services/admin/admin.service';
import UserService from './services/user/user.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';

class Controller {
  @TryCatch()
  public async loginAdm(req: Request, res: Response) {
    const result = await AdminService.loginAdm(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async forgotPasswordAdm(req: Request, res: Response) {
    const result = await AdminService.forgotPasswordAdm(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async resetPasswordAdm(req: Request, res: Response) {
    const result = await AdminService.resetPasswordAdm(req.body);
    res.status(200).json(result);
  }


  @TryCatch()
  public async loginUser(req: Request, res: Response) {
    const result = await UserService.loginUser(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async forgotPasswordUser(req: Request, res: Response) {
    const result = await UserService.forgotPasswordUser(req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async resetPasswordUser(req: Request, res: Response) {
    const result = await UserService.resetPasswordUser(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
