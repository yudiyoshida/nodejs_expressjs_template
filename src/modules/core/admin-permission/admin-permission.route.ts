import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './admin-permission.controller';

const router = Router();

router
  .route('/')
  .get(
    Auth.isAuthenticated, Auth.isAdmin,
    Controller.findAll,
  );

export default router;
