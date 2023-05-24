import { Router } from 'express';

import Controller from './auth.controller';
import Validator from './auth.validator';

const router = Router();

// rotas admins.
router
.route('/login/adm')
.post(
  Validator.login,
  Controller.loginAdm,
);

router
.route('/forgot-password/adm')
.post(
  Validator.forgotPassword,
  Controller.forgotPasswordAdm,
);

router
.route('/reset-password/adm')
.post(
  Validator.resetPassword,
  Controller.resetPasswordAdm,
);

// rotas users.
router
.route('/login/user')
.post(
  Validator.login,
  Controller.loginUser,
);

export default router;
