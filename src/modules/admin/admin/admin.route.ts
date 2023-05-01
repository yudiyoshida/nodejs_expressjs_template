import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './admin.controller';
import Validator from './admin.validator';

const router = Router();

router
.route('/')
.all(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
)
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.put(
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Controller.deleteOne,
);

router
.route('/:id/update-status')
.patch(
  Validator.pathParams, Validator.updateStatus,
  Controller.updateStatus,
);

export default router;
