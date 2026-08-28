import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { HealthcareController } from './healthcare.controller';

const router = Router();
// Provider callbacks authenticate with HMAC + timestamp instead of a user JWT.
router.post('/payments/webhook', HealthcareController.paymentWebhook);
router.use(authenticate);
router.get('/integrations/erpnext/status', HealthcareController.erpnextStatus);
router.get('/patients', HealthcareController.searchPatients);
router.post('/patients', HealthcareController.registerPatient);
router.get('/appointments', HealthcareController.listAppointments);
router.post('/appointments', HealthcareController.createAppointment);
router.post('/appointments/:id/transition', HealthcareController.transitionAppointment);
router.post('/appointments/:id/check-in', HealthcareController.checkInAppointment);
router.get('/queue', HealthcareController.listQueue);
router.post('/queue/:id/transition', HealthcareController.transitionQueueTicket);
router.post('/billing-intents', HealthcareController.createBillingIntent);
router.post('/billing-intents/:id/refunds', HealthcareController.requestRefund);
router.post('/encounters', HealthcareController.createEncounter);
router.post('/encounters/:id/submit', HealthcareController.submitEncounter);
router.post('/encounters/:id/amendments', HealthcareController.amendEncounter);

export default router;
