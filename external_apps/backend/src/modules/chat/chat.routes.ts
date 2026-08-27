import { Router } from 'express';
import { ChatController } from './chat.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/channels', authenticate, ChatController.createChannel);
router.get('/channels', authenticate, ChatController.getChannels);
router.post('/channels/:channelId/messages', authenticate, ChatController.sendMessage);
router.get('/channels/:channelId/messages', authenticate, ChatController.getMessages);

export default router;
