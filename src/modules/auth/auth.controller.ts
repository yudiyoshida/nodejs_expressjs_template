import BaseController from '@abstracts/controller';
import AdminService from './services/admin/admin.service';
import UserService from './services/user/user.service';

class Controller extends BaseController {
  public loginAdm = this.handleRequest((req) => {
    return AdminService.loginAdm(req.body);
  });

  public forgotPasswordAdm = this.handleRequest((req) => {
    return AdminService.forgotPasswordAdm(req.body);
  });

  public resetPasswordAdm = this.handleRequest((req) => {
    return AdminService.resetPasswordAdm(req.body);
  });


  public loginUser = this.handleRequest((req) => {
    return UserService.loginUser(req.body);
  });

  public forgotPasswordUser = this.handleRequest((req) => {
    return UserService.forgotPasswordUser(req.body);
  });

  public resetPasswordUser = this.handleRequest((req) => {
    return UserService.resetPasswordUser(req.body);
  });
}

export default new Controller();
