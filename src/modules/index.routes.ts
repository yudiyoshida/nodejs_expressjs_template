import { Router } from 'express';

import AdminPermissionRoutes from './admin-permission/admin-permission.route';
import AdminRoutes from './admin/admin.route';
import AuthRoutes from './auth/auth.route';
import ContactRoutes from './contact/contact.route';
import FaqRoutes from './faq/faq.route';
import TextRoutes from './text/text.route';
import UploadFileRoutes from './upload-file/upload-file.route';

const router = Router();

router.use(AdminPermissionRoutes);
router.use(AdminRoutes);
router.use(AuthRoutes);
router.use(ContactRoutes);
router.use(FaqRoutes);
router.use(TextRoutes);
router.use(UploadFileRoutes);

export default router;
