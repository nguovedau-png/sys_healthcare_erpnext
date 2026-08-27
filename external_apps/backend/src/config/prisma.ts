import { PrismaClient } from '@prisma/client';
import { erpnextSyncQueue } from '../modules/queue/queue.service';
import logger from '../utils/logger';

const prismaClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

const prisma = prismaClient.$extends({
    query: {
        user: {
            async create({ args, query }) {
                const result = await query(args);
                erpnextSyncQueue.add('sync-create', { action: 'upsert', user: result })
                    .catch(err => logger.error('Failed to queue ERPNext create sync:', err));
                return result;
            },
            async update({ args, query }) {
                const result = await query(args);
                erpnextSyncQueue.add('sync-update', { action: 'upsert', user: result })
                    .catch(err => logger.error('Failed to queue ERPNext update sync:', err));
                return result;
            },
            async delete({ args, query }) {
                // For delete, we need the user data before it is gone or we need the email from args
                // args.where usually contains id or email
                const result = await query(args);
                if (result && result.email) {
                    erpnextSyncQueue.add('sync-delete', { action: 'delete', email: result.email })
                        .catch(err => logger.error('Failed to queue ERPNext delete sync:', err));
                }
                return result;
            },
            async upsert({ args, query }) {
                const result = await query(args);
                erpnextSyncQueue.add('sync-upsert', { action: 'upsert', user: result })
                    .catch(err => logger.error('Failed to queue ERPNext upsert sync:', err));
                return result;
            }
        },
    },
});

export default prisma;
