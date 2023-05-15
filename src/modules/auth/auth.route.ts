import { Router } from 'express';

import Controller from './auth.controller';
import Validator from './auth.validator';

const router = Router();

// rotas admins.
router
.route('/adm/auth/login')
.post(
  Validator.login,
  Controller.loginAdm,
);

// rotas users.
router
.route('/user/auth/login')
.post(
  Validator.login,
  Controller.loginUser,
);

export default router;
