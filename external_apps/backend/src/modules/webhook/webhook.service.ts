import prisma from '../../config/prisma';
import { webhookQueue } from '../queue/queue.service';
import logger from '../../utils/logger';

export class WebhookService {
    static async createWebhook(data: { url: string; secret: string; events: string[], isActive?: boolean }) {
        return prisma.webhook.create({ data });
    }

    static async getWebhooks() {
        return prisma.webhook.findMany();
    }

    static async deleteWebhook(id: string) {
        return prisma.webhook.delete({ where: { id } });
    }

    static async triggerWebhook(event: string, payload: any) {
        // Find all active webhooks subscribed to this event
        const webhooks = await prisma.webhook.findMany({
            where: {
                isActive: true,
                events: { has: event }
            }
        });

        logger.info(`Triggering event ${event} for ${webhooks.length} webhooks`);

        const jobs = webhooks.map(webhook => ({
            name: 'send-webhook',
            data: {
                webhookId: webhook.id,
                url: webhook.url,
                secret: webhook.secret,
                event,
                payload,
                logId: true // Signal worker to log this execution
            }
        }));

        if (jobs.length > 0) {
            await webhookQueue.addBulk(jobs);
        }
    }
}
