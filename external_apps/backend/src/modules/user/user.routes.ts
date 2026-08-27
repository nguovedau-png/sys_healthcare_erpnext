import { Router } from 'express';
import { UserController } from './user.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize(['user'], 'create'), UserController.create);
router.get('/', authenticate, authorize(['user'], 'read'), UserController.findAll);
router.get('/:id', authenticate, authorize(['user'], 'read'), UserController.findOne);
router.put('/:id', authenticate, authorize(['user'], 'update'), UserController.update);
router.delete('/:id', authenticate, authorize(['user'], 'delete'), UserController.delete);

export default router;
