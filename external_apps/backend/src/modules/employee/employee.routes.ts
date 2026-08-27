import { Router } from 'express';
import { EmployeeController } from './employee.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize(['employee'], 'create'), EmployeeController.create);
router.get('/', authenticate, authorize(['employee'], 'read'), EmployeeController.findAll);
router.get('/:id', authenticate, authorize(['employee'], 'read'), EmployeeController.findOne);
router.put('/:id', authenticate, authorize(['employee'], 'update'), EmployeeController.update);
router.delete('/:id', authenticate, authorize(['employee'], 'delete'), EmployeeController.delete);

export default router;
