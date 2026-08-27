import { Router } from 'express';
import { OidcController } from './oidc.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate); // Protect all management routes

router.get('/clients', OidcController.getClients);
router.post('/clients', OidcController.createClient);
router.delete('/clients/:id', OidcController.deleteClient);

export default router;
