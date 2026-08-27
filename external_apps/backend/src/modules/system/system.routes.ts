import { Router } from 'express';
import { SystemController } from './system.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

// Language
router.post('/languages', authenticate, authorize(['system'], 'create'), SystemController.createLanguage);
router.get('/languages', SystemController.getLanguages); // Public
router.put('/languages/:id', authenticate, authorize(['system'], 'update'), SystemController.updateLanguage);
router.delete('/languages/:id', authenticate, authorize(['system'], 'delete'), SystemController.deleteLanguage);

// Settings
router.get('/settings', authenticate, SystemController.getSettings); // Might return public only if not auth, logic in controller
router.put('/settings/:key', authenticate, authorize(['system'], 'update'), SystemController.updateSetting);

// Health
router.get('/health', SystemController.getHealth);

export default router;
