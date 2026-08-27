import { Router } from 'express';
import { JobController } from './job.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize(['job'], 'create'), JobController.createJob);
router.post('/schedule', authenticate, authorize(['job'], 'create'), JobController.scheduleJob);
router.get('/scheduled', authenticate, authorize(['job'], 'read'), JobController.getScheduledJobs);
router.get('/', authenticate, authorize(['job'], 'read'), JobController.getJobs);
router.get('/stats', authenticate, authorize(['job'], 'read'), JobController.getJobStats);
router.delete('/:id', authenticate, authorize(['job'], 'delete'), JobController.deleteJob);
router.post('/:id/retry', authenticate, authorize(['job'], 'update'), JobController.retryJob);
router.delete('/scheduled/:key', authenticate, authorize(['job'], 'delete'), JobController.deleteScheduledJob);
router.post('/prune', authenticate, authorize(['job'], 'delete'), JobController.pruneJobs);

export default router;
