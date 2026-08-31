import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BackgroundJobService, JobType } from './backgroundjob.service';

@Controller()
export class BackgroundJobController {
    constructor(private readonly backgroundJobService: BackgroundJobService) { }

    @MessagePattern({ cmd: 'job.create' })
    createJob(@Payload() payload: { jobType: JobType; name: string; data: any; scheduledAt?: string }) {
        return this.backgroundJobService.createJob(
            payload.jobType,
            payload.name,
            payload.data,
            payload.scheduledAt ? new Date(payload.scheduledAt) : undefined,
        );
    }

    @MessagePattern({ cmd: 'job.getAll' })
    getJobs(@Payload() payload: { jobType?: JobType; status?: string }) {
        return this.backgroundJobService.getJobs(payload.jobType, payload.status);
    }

    @MessagePattern({ cmd: 'job.getOne' })
    getJob(@Payload() id: number) {
        return this.backgroundJobService.getJob(id);
    }

    @MessagePattern({ cmd: 'job.delete' })
    deleteJob(@Payload() id: number) {
        return this.backgroundJobService.deleteJob(id);
    }

    @MessagePattern({ cmd: 'job.stats' })
    getStats() {
        return this.backgroundJobService.getStats();
    }
}
