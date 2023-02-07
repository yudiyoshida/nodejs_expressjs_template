import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './admin.controller';
import Validator from './admin.validator';

const router = Router();

router
  .route('/')
  .get(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.admins),
    Validator.queryParams,
    Controller.findAll,
  )
  .post(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.admins),
    Validator.upsert,
    Controller.create,
  );

router
  .route('/:id')
  .get(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.admins),
    Validator.pathParams,
    Controller.findById,
  )
  .put(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.admins),
    Validator.pathParams, Validator.upsert,
    Controller.update,
  )
  .delete(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.admins),
    Validator.pathParams,
    Controller.delete,
  );

router
  .route('/:id/update-status')
  .patch(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.admins),
    Validator.pathParams, Validator.updateStatus,
    Controller.updateStatus,
  );

export default router;
