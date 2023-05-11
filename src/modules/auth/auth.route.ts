import { Router } from 'express';

import Controller from './auth.controller';
import Validator from './auth.validator';

const router = Router();

router
.route('/auth/login')
.post(
  Validator.login,
  Controller.login,
);

export default router;
