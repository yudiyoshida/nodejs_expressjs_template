import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './admin-permission.controller';

const router = Router();

router
  .route('/')
  .get(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.admins),
    Controller.findAll,
  );

export default router;
