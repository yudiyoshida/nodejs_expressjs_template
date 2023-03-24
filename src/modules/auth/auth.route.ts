import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './auth.controller';
import Validator from './auth.validator';

const router = Router();

router
  .post('/login',
    Validator.login,
    Controller.login,
  )
  .post('/forgot-password',
    Validator.forgotPassword,
    Controller.forgotPassword,
  )
  .post('/reset-password',
    Validator.resetPassword,
    Controller.resetPassword,
  )
  .post('/update-password',
    Auth.isAuthenticated,
    Validator.updatePassword,
    Controller.updatePassword,
  )
  .post('/validate-fields',
    Validator.validateFields,
    Controller.validateFields,
  )
  .post('/validate-code',
    Validator.validateCode,
    Controller.validateCode,
  );

export default router;
