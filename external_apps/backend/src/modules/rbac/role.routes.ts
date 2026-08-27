import { Router } from 'express';
import { RoleController } from './role.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

import { cacheMiddleware } from '../../middlewares/cache.middleware';

router.post('/', authenticate, authorize(['role'], 'create'), RoleController.create);
router.get('/', authenticate, authorize(['role'], 'read'), cacheMiddleware(300), RoleController.findAll);
router.get('/:id', authenticate, authorize(['role'], 'read'), RoleController.findOne);
router.put('/:id', authenticate, authorize(['role'], 'update'), RoleController.update);
router.delete('/:id', authenticate, authorize(['role'], 'delete'), RoleController.delete);

export default router;
