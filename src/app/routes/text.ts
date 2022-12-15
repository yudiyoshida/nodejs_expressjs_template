import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import AuthMiddleware from '@middlewares/auth';
import TextController from '@controllers/text';
import TextValidator from '@validators/text';

const router = Router();

router
  .route('/')
  .get(
    TextValidator.queryParams,
    TextController.findByType,
  )
  .put(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.texts),
    TextValidator.queryParams, TextValidator.update,
    TextController.update,
  );

export default router;
