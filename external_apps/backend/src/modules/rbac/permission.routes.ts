import { Router } from 'express';
import { PermissionController } from './permission.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize(['permission'], 'create'), PermissionController.create);
router.get('/', authenticate, authorize(['permission'], 'read'), PermissionController.findAll);
router.put('/:id', authenticate, authorize(['permission'], 'update'), PermissionController.update);
router.delete('/:id', authenticate, authorize(['permission'], 'delete'), PermissionController.delete);

export default router;
