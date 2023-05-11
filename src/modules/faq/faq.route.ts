import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './faq.controller';
import Validator from './faq.validator';

const router = Router();

// rotas comuns.
router
.route('/faqs')
.get(
  Validator.queryParams,
  Controller.findAllNoAuth,
);

// rotas de administrador.
router
.route('/adm/faqs')
.all(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
)
.get(
  Validator.queryParams,
  Controller.findAllAsAdmin,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/adm/faqs/:id')
.all(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
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

export default router;
