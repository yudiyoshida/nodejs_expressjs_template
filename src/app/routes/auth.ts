import { Router } from 'express';

import AuthMiddleware from '@middlewares/auth';
import AuthController from '@controllers/auth';
import AuthValidator from '@validators/auth';

import UserController from '@controllers/user';
import UserValidator from '@validators/user';

const router = Router();

router
  .post('/login',
    AuthValidator.login,
    AuthController.login,
  )
  .post('/forgot-password',
    AuthValidator.forgotPassword,
    AuthController.forgotPassword,
  )
  .post('/reset-password',
    AuthValidator.resetPassword,
    AuthController.resetPassword,
  )
  .post('/update-password',
    AuthMiddleware.isAuthenticated,
    AuthValidator.updatePassword,
    AuthController.updatePassword,
  ).
  post('/validate-fields',
    AuthValidator.validateFields,
    AuthController.validateFields,
  )
  .post('/validate-code',
    AuthValidator.validateCode,
    AuthController.validateCode,
  )
  .post('/register',
    UserValidator.createUser,
    UserController.createUser,
  );

export default router;
