import { Router } from 'express';

import AdminPermissionRoutes from './admin-permission/admin-permission.route';
import AdminRoutes from './admin/admin.route';
import AuthRoutes from './auth/auth.route';
import ContactRoutes from './contact/contact.route';
import FaqRoutes from './faq/faq.route';
import TextRoutes from './text/text.route';
import UploadFileRoutes from './upload-file/upload-file.route';

const router = Router();

router.use('/admins/permissions', AdminPermissionRoutes);
router.use('/admins', AdminRoutes);
router.use('/auth', AuthRoutes);
router.use('/contact', ContactRoutes);
router.use('/faqs', FaqRoutes);
router.use('/texts', TextRoutes);
router.use('/upload-file', UploadFileRoutes);

export default router;
