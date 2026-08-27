import { Request, Response } from 'express';
import { queues } from '../queue/queue.service';
import prisma from '../../config/prisma';
import { JobType, JobStatus, Prisma } from '@prisma/client';

export class JobController {

    static async createJob(req: Request, res: Response) {
        try {
            const { type, data } = req.body;
            let job;
            let prismaType: JobType;

            // Map frontend type to Prisma Enum
            switch (type) {
                case 'email': prismaType = JobType.EMAIL; break;
                case 'notification': prismaType = JobType.PUSH_NOTIFICATION; break;
                case 'heavy': prismaType = JobType.HEAVY_TASK; break;
                default: return res.status(400).json({ success: false, message: 'Invalid job type' });
            }

            // Log job to DB
            const dbJob = await prisma.job.create({
                data: {
                    name: `Job-${Date.now()}`,
                    type: prismaType,
                    data: data || Prisma.DbNull,
                    status: 'PENDING'
                }
            });

            if (type === 'email') {
                job = await queues.email.add('send-email', data);
            } else if (type === 'notification') {
                job = await queues.notification.add('send-notification', data);
            } else if (type === 'heavy') {
                // Pass dbJob.id so worker can update status
                job = await queues.heavy.add('process-heavy', { ...data, jobId: dbJob.id });
            }

            res.status(201).json({ success: true, data: { jobId: job?.id, dbJob } });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async getJobs(req: Request, res: Response) {
        try {
            const { page = 1, limit = 20, type, status } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const where: Prisma.JobWhereInput = {};

            if (type) {
                if (type === 'email') where.type = JobType.EMAIL;
                else if (type === 'notification') where.type = JobType.PUSH_NOTIFICATION;
                else if (type === 'heavy') where.type = JobType.HEAVY_TASK;
            }

            if (status) {
                if (Object.values(JobStatus).includes(status as JobStatus)) {
                    where.status = status as JobStatus;
                }
            }

            const [total, jobs] = await Promise.all([
                prisma.job.count({ where }),
                prisma.job.findMany({
                    where,
                    skip,
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' }
                })
            ]);
            res.status(200).json({
                success: true,
                data: jobs,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getJobStats(req: Request, res: Response) {
        try {
            const [emailCount, notificationCount, activeCount, completedCount, failedCount] = await Promise.all([
                queues.email.getJobCounts(),
                queues.notification.getJobCounts(),
                queues.heavy.getActiveCount(),
                queues.heavy.getCompletedCount(),
                queues.heavy.getFailedCount()
            ]);

            res.status(200).json({
                success: true,
                data: {
                    email: emailCount,
                    notification: notificationCount,
                    heavy: { active: activeCount, completed: completedCount, failed: failedCount }
                }
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async scheduleJob(req: Request, res: Response) {
        try {
            const { type, data, cron, name } = req.body;
            let queue;

            if (type === 'email') queue = queues.email;
            else if (type === 'notification') queue = queues.notification;
            else if (type === 'heavy') queue = queues.heavy;
            else return res.status(400).json({ success: false, message: 'Invalid job type' });

            await queue.add(name || type, data, {
                repeat: { pattern: cron }
            });

            res.status(201).json({ success: true, message: 'Job scheduled successfully' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async getScheduledJobs(req: Request, res: Response) {
        try {
            const [emailJobs, notificationJobs, heavyJobs] = await Promise.all([
                queues.email.getRepeatableJobs(),
                queues.notification.getRepeatableJobs(),
                queues.heavy.getRepeatableJobs()
            ]);

            const jobs = [
                ...emailJobs.map(j => ({ ...j, type: 'email' })),
                ...notificationJobs.map(j => ({ ...j, type: 'notification' })),
                ...heavyJobs.map(j => ({ ...j, type: 'heavy' }))
            ];

            res.status(200).json({ success: true, data: jobs });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async deleteJob(req: Request, res: Response) {
        try {
            const { id } = req.params;
            // Delete from DB
            await prisma.job.delete({ where: { id } });
            // Note: Deleting from queue requires BullMQ ID which we might not have stored efficiently in this simple schema.
            // For now, we mainly delete the DB record.
            res.status(200).json({ success: true, message: 'Job log deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async deleteScheduledJob(req: Request, res: Response) {
        try {
            const { key } = req.params;
            const { type } = req.query; // Need type to know which queue

            let queue;
            if (type === 'email') queue = queues.email;
            else if (type === 'notification') queue = queues.notification;
            else if (type === 'heavy') queue = queues.heavy;
            else return res.status(400).json({ success: false, message: 'Invalid job type' });

            await queue.removeRepeatableByKey(key as string);
            res.status(200).json({ success: true, message: 'Scheduled job removed' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async retryJob(req: Request, res: Response) {
        try {
            const { id } = req.params;
            // This assumes 'id' is the DB id.
            const jobLog = await prisma.job.findUnique({ where: { id } });
            if (!jobLog) return res.status(404).json({ message: 'Job not found' });

            // Re-create the job in the queue using correct Enum comparisons
            if (jobLog.type === JobType.EMAIL) await queues.email.add('send-email', jobLog.data);
            else if (jobLog.type === JobType.PUSH_NOTIFICATION) await queues.notification.add('send-notification', jobLog.data);
            else if (jobLog.type === JobType.HEAVY_TASK) await queues.heavy.add('process-heavy', { ...(jobLog.data as object), jobId: jobLog.id });

            // Update status
            await prisma.job.update({
                where: { id },
                data: { status: 'PENDING', result: Prisma.DbNull, error: null }
            });

            res.status(200).json({ success: true, message: 'Job retried' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async pruneJobs(req: Request, res: Response) {
        try {
            const { status, days } = req.body;
            // Default: Delete COMPLETED/FAILED jobs older than 7 days
            const where: Prisma.JobWhereInput = {};

            if (status) {
                if (Array.isArray(status)) {
                    where.status = { in: status as JobStatus[] };
                } else {
                    where.status = status as JobStatus;
                }
            } else {
                where.status = { in: [JobStatus.COMPLETED, JobStatus.FAILED] };
            }

            if (days) {
                const date = new Date();
                date.setDate(date.getDate() - Number(days));
                where.createdAt = { lt: date };
            }

            const result = await prisma.job.deleteMany({ where });
            res.status(200).json({ success: true, message: `Deleted ${result.count} jobs` });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
