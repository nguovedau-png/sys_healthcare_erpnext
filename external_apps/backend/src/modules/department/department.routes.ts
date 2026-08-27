import { Router } from 'express';
import { DepartmentController } from './department.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize(['department'], 'create'), DepartmentController.create);
router.get('/', authenticate, authorize(['department'], 'read'), DepartmentController.findAll);
router.get('/:id', authenticate, authorize(['department'], 'read'), DepartmentController.findOne);
router.put('/:id', authenticate, authorize(['department'], 'update'), DepartmentController.update);
router.delete('/:id', authenticate, authorize(['department'], 'delete'), DepartmentController.delete);

export default router;
