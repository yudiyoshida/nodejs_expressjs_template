import { Router } from 'express';

const router = Router();

import AuthRoutes from './auth/auth.routes';
import FaqRoutes from './faq/faq.routes';

router.use('/auth', AuthRoutes);
router.use('/faqs', FaqRoutes);

export default router;
