import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './admin.controller';
import Validator from './admin.validator';

const router = Router();

router
.route('/')
.get(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.configuracoes),
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.configuracoes),
  Validator.createOne,
  Controller.createAdmin,
);

router
.route('/:id')
.get(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.configuracoes),
  Validator.pathParams,
  Controller.findOne,
)
.put(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.configuracoes),
  Validator.pathParams, Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.configuracoes),
  Validator.pathParams,
  Controller.deleteOne,
);

router
.route('/:id/update-status')
.patch(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.configuracoes),
  Validator.pathParams, Validator.updateStatus,
  Controller.updateStatus,
);

export default router;
