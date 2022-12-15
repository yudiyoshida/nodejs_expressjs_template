import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import AuthMiddleware from '@middlewares/auth';
import AdminController from '@controllers/admin';
import AdminValidator from '@validators/admin';

const router = Router();

router
  .route('/')
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.admins),
    AdminValidator.queryParams,
    AdminController.findAll,
  )
  .post(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.admins),
    AdminValidator.createAdmin,
    AdminController.createAdmin,
  );

router
  .route('/permissions')
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin,
    AdminController.findAllPermissions,
  );

router
  .route('/:id')
  .get(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.admins),
    AdminValidator.pathParams,
    AdminController.findById,
  );

router
  .route('/:id/update-status')
  .patch(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.admins),
    AdminValidator.pathParams, AdminValidator.updateStatus,
    AdminController.updateStatus,
  );

export default router;
