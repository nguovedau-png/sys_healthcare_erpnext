import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

async function enqueueUserSync(action: 'upsert' | 'delete', payload: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'test' || !process.env.ERPNEXT_URL || !process.env.ERPNEXT_API_KEY || !process.env.ERPNEXT_API_SECRET) return;
    try {
        const { erpnextSyncQueue } = await import('../modules/queue/queue.service');
        await erpnextSyncQueue.add(`sync-${action}`, { action, ...payload });
    } catch (error) {
        logger.error('Failed to queue ERPNext user sync', { action, error: error instanceof Error ? error.message : 'unknown error' });
    }
}

const prismaClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

const prisma = prismaClient.$extends({
    query: {
        user: {
            async create({ args, query }) {
                const result = await query(args);
                void enqueueUserSync('upsert', { user: result });
                return result;
            },
            async update({ args, query }) {
                const result = await query(args);
                void enqueueUserSync('upsert', { user: result });
                return result;
            },
            async delete({ args, query }) {
                // For delete, we need the user data before it is gone or we need the email from args
                // args.where usually contains id or email
                const result = await query(args);
                if (result && result.email) {
                    void enqueueUserSync('delete', { email: result.email });
                }
                return result;
            },
            async upsert({ args, query }) {
                const result = await query(args);
                void enqueueUserSync('upsert', { user: result });
                return result;
            }
        },
    },
});

export default prisma;
