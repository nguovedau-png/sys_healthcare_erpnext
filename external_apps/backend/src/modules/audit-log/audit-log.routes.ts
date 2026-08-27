import { Router } from 'express';
import { AuditLogController } from './audit-log.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

// Only admin or users with specific permission can view audit logs
router.get('/', authenticate, authorize(['audit_log'], 'read'), AuditLogController.findAll);

export default router;
