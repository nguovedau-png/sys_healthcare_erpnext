import { Router } from 'express';
import { OidcController } from './oidc.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate); // Protect all management routes

router.get('/clients', authorize(['system'], 'manage'), OidcController.getClients);
router.post('/clients', authorize(['system'], 'manage'), OidcController.createClient);
router.delete('/clients/:id', authorize(['system'], 'manage'), OidcController.deleteClient);

export default router;
