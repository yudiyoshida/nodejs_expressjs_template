import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './user.controller';
import Validator from './user.validator';

const router = Router();

router
  .route('/')
  .get(
    Auth.isAuthenticated, Auth.isAuthorized(AdminPermission.users),
    Validator.queryParams,
    Controller.findAll,
  )
  .post(
    Validator.create,
    Controller.create,
  );

router
  .route('/myself')
  .get(
    Auth.isAuthenticated,
    Controller.findMyself,
  );

router
  .route('/:id')
  .get(
    Auth.isAuthenticated, Auth.isAuthorized(AdminPermission.users),
    Validator.pathParams,
    Controller.findById,
  );

router
  .route('/:id/update-status')
  .patch(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.users),
    Validator.pathParams, Validator.updateStatus,
    Controller.updateStatus,
  );

export default router;
