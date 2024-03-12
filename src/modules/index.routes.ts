import { Router } from 'express';

const router = Router();

import AccountRoutes from './account/account.routes';
import AuthRoutes from './auth/auth.routes';
import FaqRoutes from './faq/faq.routes';

router.use('/accounts', AccountRoutes);
router.use('/auth', AuthRoutes);
router.use('/faqs', FaqRoutes);

export default router;
