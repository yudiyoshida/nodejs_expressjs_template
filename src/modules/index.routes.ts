import { Router } from 'express';

const router = Router();

import FaqRoutes from './faqs/faqs.routes';

router.use('/faqs', FaqRoutes);

export default router;
