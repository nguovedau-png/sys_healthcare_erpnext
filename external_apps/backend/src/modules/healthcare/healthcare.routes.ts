import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { HealthcareController } from './healthcare.controller';

const router = Router();
router.use(authenticate);
router.get('/integrations/erpnext/status', HealthcareController.erpnextStatus);
router.get('/patients', HealthcareController.searchPatients);
router.post('/patients', HealthcareController.registerPatient);
router.get('/appointments', HealthcareController.listAppointments);
router.post('/appointments', HealthcareController.createAppointment);
router.post('/appointments/:id/transition', HealthcareController.transitionAppointment);
router.post('/encounters', HealthcareController.createEncounter);
router.post('/encounters/:id/submit', HealthcareController.submitEncounter);
router.post('/encounters/:id/amendments', HealthcareController.amendEncounter);

export default router;
