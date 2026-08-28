import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import logger from '../../utils/logger';
import { sendEmail } from '../notification/email.service';
import { NotificationService } from '../notification/notification.service';
import prisma from '../../config/prisma';

const isTest = process.env.NODE_ENV === 'test';
const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number.parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: null,
};

const connection = isTest ? null : new IORedis(redisConfig);
const noopQueue = {
    add: async () => ({ id: 'test-job' }),
    addBulk: async () => [],
} as unknown as Queue;
const createQueue = (name: string) => connection ? new Queue(name, { connection }) : noopQueue;

export const emailQueue = createQueue('email');
export const notificationQueue = createQueue('notification');
export const heavyJobQueue = createQueue('heavy-job');
export const webhookQueue = createQueue('webhook');
export const erpnextSyncQueue = createQueue('erpnext-sync');

// Workers are initialized only when explicitly called
export const setupWorkers = () => {
    if (!connection) throw new Error('Redis is required to start queue workers');
    logger.info('Initializing workers...');

    // Email Worker
    const emailWorker = new Worker('email', async (job) => {
        logger.info(`Processing email job ${job.id}`);
        const { to, subject, html } = job.data;
        await sendEmail(to, subject, html);
    }, { connection });

    emailWorker.on('completed', (job) => {
        logger.info(`Email job ${job.id} completed`);
    });

    emailWorker.on('failed', (job, err) => {
        logger.error(`Email job ${job?.id} failed with ${err.message}`);
    });

    // Notification Worker
    const notificationWorker = new Worker('notification', async (job) => {
        logger.info(`Processing notification job ${job.id}`);
        const { token, tokens, title, body, data } = job.data;

        if (tokens && Array.isArray(tokens)) {
            await NotificationService.sendMulticastNotification(tokens, title, body, data);
        } else if (token) {
            await NotificationService.sendPushNotification(token, title, body, data);
        }
    }, { connection });

    // Heavy Job Worker
    const heavyJobWorker = new Worker('heavy-job', async (job) => {
        logger.info(`Processing heavy job ${job.id}`);

        // Simulate heavy task
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Update db status if needed
        if (job.data.jobId) {
            await prisma.job.update({
                where: { id: job.data.jobId },
                data: { status: 'COMPLETED', finishedAt: new Date(), result: { success: true } }
            });
        }

        logger.info(`Heavy job ${job.id} completed`);
    }, { connection });

    // Webhook Worker
    const webhookWorker = new Worker('webhook', async (job) => {
        const { url, secret, event, payload, logId } = job.data;
        logger.info(`Processing webhook for event ${event} to ${url}`);

        try {
            // Calculate Signature
            const crypto = require('crypto');
            const hmac = crypto.createHmac('sha256', secret);
            const signature = hmac.update(JSON.stringify(payload)).digest('hex');

            // Send Request
            const axios = require('axios');
            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Hub-Signature': `sha256=${signature}`,
                    'X-Event': event
                },
                validateStatus: () => true // Resolve promise for all status codes
            });

            // Log Success (or failure based on status)
            if (logId) {
                await prisma.webhookLog.create({
                    data: {
                        webhookId: job.data.webhookId,
                        event,
                        payload,
                        responseStatus: response.status,
                        responseBody: JSON.stringify(response.data).substring(0, 1000), // Truncate if too long
                        success: response.status >= 200 && response.status < 300
                    }
                });
            }

            if (response.status >= 300) throw new Error(`Webhook failed with status ${response.status}`);

            logger.info(`Webhook sent successfully to ${url}`);
        } catch (error: any) {
            logger.error(`Webhook failed: ${error.message}`);
            // Log Failure if needed, though we did it above for response errors. 
            // Network errors land here.
            if (logId) {
                await prisma.webhookLog.create({
                    data: {
                        webhookId: job.data.webhookId,
                        event,
                        payload,
                        responseStatus: 0,
                        responseBody: error.message,
                        success: false
                    }
                });
            }
            throw error; // Trigger retry
        }
    }, { connection });

    // ERPNext Sync Worker
    const erpnextSyncWorker = new Worker('erpnext-sync', async (job) => {
        const { action, user, email } = job.data;
        logger.info(`Processing ERPNext Sync job ${job.id} for action ${action}`);

        const { ERPNextSyncService } = require('../sync/erpnext-sync.service');

        if (action === 'upsert') {
            await ERPNextSyncService.upsertCustomer(user);
        } else if (action === 'delete') {
            await ERPNextSyncService.deleteCustomer(email);
        }
    }, { connection });

    erpnextSyncWorker.on('completed', (job) => {
        logger.info(`ERPNext Sync job ${job.id} completed`);
    });

    erpnextSyncWorker.on('failed', (job, err) => {
        logger.error(`ERPNext Sync job ${job?.id} failed: ${err.message}`);
    });

    logger.info('Workers initialized.');
};

export const queues = {
    email: emailQueue,
    notification: notificationQueue,
    heavy: heavyJobQueue,
    webhook: webhookQueue,
    erpnextSync: erpnextSyncQueue
};
