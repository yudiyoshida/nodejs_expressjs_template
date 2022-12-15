import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import AuthMiddleware from '@middlewares/auth';
import UserController from '@controllers/user';
import UserValidator from '@validators/user';

const router = Router();

router
  .route('/')
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized(AdminPermission.users),
    UserValidator.queryParams,
    UserController.findAll,
  );

router
  .route('/myself')
  .get(
    AuthMiddleware.isAuthenticated,
    UserController.findMyself,
  );

router
  .route('/:id')
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAuthorized(AdminPermission.users),
    UserValidator.pathParams,
    UserController.findById,
  );

router
  .route('/:id/update-status')
  .patch(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.users),
    UserValidator.pathParams, UserValidator.updateStatus,
    UserController.updateStatus,
  );

export default router;
