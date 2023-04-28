import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './admin-permission.controller';

const router = Router();

router
.route('/')
.get(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.admin),
  Controller.findAll,
);

export default router;
