import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './user.controller';
import Validator from './user.validator';

const router = Router();

router
  .route('/users')
  .get(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.usuarios),
    Validator.queryParams,
    Controller.findAll,
  )
  .post(
    Validator.create,
    Controller.create,
  );

router
  .route('/users/myself')
  .get(
    Auth.isAuthenticated, Auth.isApp,
    Controller.findMyself,
  )
  .put(
    Auth.isAuthenticated, Auth.isApp,
    Validator.updateMyself,
    Controller.updateMyself,
  )
  .delete(
    Auth.isAuthenticated, Auth.isApp,
    Controller.deleteMyself,
  );

router
  .route('/users/:id')
  .get(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.usuarios),
    Validator.pathParams,
    Controller.findById,
  );

router
  .route('/users/:id/update-status')
  .patch(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.usuarios),
    Validator.pathParams, Validator.updateStatus,
    Controller.updateStatus,
  );

export default router;
