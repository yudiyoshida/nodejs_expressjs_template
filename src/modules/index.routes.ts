import { Router } from 'express';

const router = Router();

import FaqRoutes from './faq/faq.routes';

router.use('/faqs', FaqRoutes);

export default router;
