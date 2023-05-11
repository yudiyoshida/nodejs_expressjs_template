import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './text.controller';
import Validator from './text.validator';

const router = Router();

router
.route('/texts')
.get(
  Validator.queryParams,
  Controller.findOneNoAuth,
);

router
.route('/adm/texts')
.all(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.texts),
  Validator.queryParams,
)
.get(
  Controller.findOneAsAdmin,
)
.put(
  Validator.updateOne,
  Controller.updateOne,
);

export default router;
