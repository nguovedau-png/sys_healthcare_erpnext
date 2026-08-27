import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from './prisma.service';

export enum JobType {
    FILE_PROCESSING = 'FILE_PROCESSING',
    EMAIL = 'EMAIL',
    SMS = 'SMS',
    NOTIFICATION = 'NOTIFICATION',
    SCHEDULED = 'SCHEDULED',
}

@Injectable()
export class BackgroundJobService {
    constructor(
        @InjectQueue('file') private fileQueue: Queue,
        @InjectQueue('email') private emailQueue: Queue,
        @InjectQueue('sms') private smsQueue: Queue,
        @InjectQueue('notification') private notificationQueue: Queue,
        @InjectQueue('scheduled') private scheduledQueue: Queue,
        private prisma: PrismaService,
    ) { }

    async createJob(jobType: JobType, name: string, data: any, scheduledAt?: Date) {
        const queue = this.getQueue(jobType);
        const job = await queue.add(name, data, {
            delay: scheduledAt ? scheduledAt.getTime() - Date.now() : 0,
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 2000,
            },
        });

        const backgroundJob = await this.prisma.backgroundJob.create({
            data: {
                jobType,
                jobId: job.id.toString(),
                name,
                data,
                scheduledAt,
            },
        });

        return backgroundJob;
    }

    async getJobs(jobType?: JobType, status?: string) {
        return this.prisma.backgroundJob.findMany({
            where: {
                jobType,
                status: status as any,
            },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
    }

    async getJob(id: number) {
        return this.prisma.backgroundJob.findUnique({
            where: { id },
        });
    }

    async deleteJob(id: number) {
        const job = await this.prisma.backgroundJob.findUnique({
            where: { id },
        });

        if (job) {
            const queue = this.getQueue(job.jobType as JobType);
            await queue.removeJobs(job.jobId);
            await this.prisma.backgroundJob.delete({
                where: { id },
            });
        }

        return { success: true };
    }

    async getStats() {
        const stats = await this.prisma.backgroundJob.groupBy({
            by: ['jobType', 'status'],
            _count: true,
        });

        return stats;
    }

    private getQueue(jobType: JobType): Queue {
        switch (jobType) {
            case JobType.FILE_PROCESSING:
                return this.fileQueue;
            case JobType.EMAIL:
                return this.emailQueue;
            case JobType.SMS:
                return this.smsQueue;
            case JobType.NOTIFICATION:
                return this.notificationQueue;
            case JobType.SCHEDULED:
                return this.scheduledQueue;
            default:
                throw new Error(`Unknown job type: ${jobType}`);
        }
    }
}
