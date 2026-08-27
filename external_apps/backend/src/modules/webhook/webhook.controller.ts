import { Request, Response } from 'express';
import { WebhookService } from './webhook.service';

export class WebhookController {
    static async create(req: Request, res: Response) {
        try {
            const { url, secret, events } = req.body;
            const webhook = await WebhookService.createWebhook({ url, secret, events });
            res.status(201).json({ success: true, data: webhook });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const webhooks = await WebhookService.getWebhooks();
            res.status(200).json({ success: true, data: webhooks });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await WebhookService.deleteWebhook(req.params.id);
            res.status(200).json({ success: true, message: 'Webhook deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async testTrigger(req: Request, res: Response) {
        try {
            const { event, payload } = req.body;
            await WebhookService.triggerWebhook(event, payload);
            res.status(200).json({ success: true, message: 'Event triggered' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
