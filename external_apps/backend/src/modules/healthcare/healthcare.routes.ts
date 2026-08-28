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
router.get('/patients/:patientId/family-links', HealthcareController.listFamilyLinks);
router.post('/patients/:patientId/family-links', HealthcareController.createFamilyLink);
router.delete('/family-links/:linkId', HealthcareController.revokeFamilyLink);
router.get('/patients/:patientId/consents', HealthcareController.listConsents);
router.post('/patients/:patientId/consents', HealthcareController.captureConsent);
router.post('/consents/:id/withdraw', HealthcareController.withdrawConsent);
router.get('/appointments', HealthcareController.listAppointments);
router.post('/appointments', HealthcareController.createAppointment);
router.post('/appointments/:id/transition', HealthcareController.transitionAppointment);
router.post('/appointments/:id/check-in', HealthcareController.checkInAppointment);
router.get('/queue', HealthcareController.listQueue);
router.post('/queue/:id/transition', HealthcareController.transitionQueueTicket);
router.get('/billing-intents', HealthcareController.listBillingIntents);
router.post('/billing-intents', HealthcareController.createBillingIntent);
router.post('/billing-intents/:id/refunds', HealthcareController.requestRefund);
router.post('/encounters', HealthcareController.createEncounter);
router.post('/encounters/:id/submit', HealthcareController.submitEncounter);
router.post('/encounters/:id/amendments', HealthcareController.amendEncounter);

export default router;
