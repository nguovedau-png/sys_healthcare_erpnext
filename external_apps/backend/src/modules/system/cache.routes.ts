import { Router } from 'express';
import { CacheController } from './cache.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

// Only admin should access cache management
router.get('/keys', authenticate, authorize(['system'], 'manage'), CacheController.getKeys);
router.delete('/clear', authenticate, authorize(['system'], 'manage'), CacheController.clearAll);
router.get('/item', authenticate, authorize(['system'], 'manage'), CacheController.getKeyDetail);
router.post('/', authenticate, authorize(['system'], 'manage'), CacheController.setKey);
router.delete('/item', authenticate, authorize(['system'], 'manage'), CacheController.deleteKey);

export default router;
