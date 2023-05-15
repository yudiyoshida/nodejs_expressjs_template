import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './admin.controller';
import Validator from './admin.validator';

const router = Router();

// rotas admins.
router
.route('/adm/admins')
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
.route('/adm/admins/:id')
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
.route('/adm/admins/:id/update-status')
.patch(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Validator.pathParams, Validator.updateStatus,
  Controller.updateStatus,
);

export default router;
