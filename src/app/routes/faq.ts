import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import AuthMiddleware from '@middlewares/auth';
import FaqController from '@controllers/faq';
import FaqValidator from '@validators/faq';

const router = Router();

router
  .route('/')
  .get(
    FaqController.findAll,
  )
  .post(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.faqs),
    FaqValidator.upsert,
    FaqController.create,
  );

router
  .route('/:id')
  .put(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.faqs),
    FaqValidator.pathParams, FaqValidator.upsert,
    FaqController.update,
  )
  .delete(
    AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AuthMiddleware.isAuthorized(AdminPermission.faqs),
    FaqValidator.pathParams,
    FaqController.delete,
  );

export default router;
