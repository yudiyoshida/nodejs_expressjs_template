import { Router } from 'express';

import AuthRoutes from './commom/auth/auth.route';
import UploadFileRoutes from './commom/upload-file/upload-file.route';
import FaqRoutes from './commom/faq/faq.route';
import TextRoutes from './commom/text/text.route';

import AdmAdminPermissionRoutes from './admin/admin-permission/admin-permission.route';
import AdmAdminRoutes from './admin/admin/admin.route';
import AdmFaqRoutes from './admin/faq/faq.route';
import AdmTextRoutes from './admin/text/text.route';

const router = Router();

// rotas comuns.
router.use('/auth', AuthRoutes);
router.use('/upload-file', UploadFileRoutes);
router.use('/faqs', FaqRoutes);
router.use('/texts', TextRoutes);

// portal gerencial.
router.use('/adm/admins/permissions', AdmAdminPermissionRoutes);
router.use('/adm/admins', AdmAdminRoutes);
router.use('/adm/faqs', AdmFaqRoutes);
router.use('/adm/texts', AdmTextRoutes);

export default router;
