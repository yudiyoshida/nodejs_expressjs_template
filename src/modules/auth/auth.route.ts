import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './auth.controller';
import Validator from './auth.validator';

const router = Router();

router
  .post('/auth/login',
    Validator.login,
    Controller.login,
  )
  .post('/auth/forgot-password',
    Validator.forgotPassword,
    Controller.forgotPassword,
  )
  .post('/auth/reset-password',
    Validator.resetPassword,
    Controller.resetPassword,
  )
  .post('/auth/update-password',
    Auth.isAuthenticated,
    Validator.updatePassword,
    Controller.updatePassword,
  )
  .post('/auth/validate-fields',
    Validator.validateFields,
    Controller.validateFields,
  )
  .post('/auth/validate-code',
    Validator.validateCode,
    Controller.validateCode,
  );

export default router;
