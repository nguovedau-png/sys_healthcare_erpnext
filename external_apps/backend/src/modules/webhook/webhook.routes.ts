import { Router } from 'express';
import { WebhookController } from './webhook.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize(['system'], 'manage'), WebhookController.create);
router.get('/', authenticate, authorize(['system'], 'manage'), WebhookController.list);
router.delete('/:id', authenticate, authorize(['system'], 'manage'), WebhookController.delete);
router.post('/trigger', authenticate, authorize(['system'], 'manage'), WebhookController.testTrigger);

export default router;
