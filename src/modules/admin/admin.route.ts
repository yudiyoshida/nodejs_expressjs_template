import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './admin.controller';
import Validator from './admin.validator';

const router = Router();

router
.route('/admins')
.get(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Validator.createOne,
  Controller.createOne,
);

router
.route('admins/:id')
.get(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Validator.pathParams,
  Controller.findOne,
)
.put(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Validator.pathParams, Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Validator.pathParams,
  Controller.deleteOne,
);

router
.route('admins/:id/update-status')
.patch(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Validator.pathParams, Validator.updateStatus,
  Controller.updateStatus,
);

export default router;
