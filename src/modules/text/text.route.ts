import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './text.controller';
import Validator from './text.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findOne,
)
.put(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.texts),
  Validator.updateOne,
  Controller.updateOne,
);

export default router;
