import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto, UpdateJobApplicationDto } from './dto/job-application.dto';

@Controller()
export class JobApplicationController {
    constructor(private readonly jobApplicationService: JobApplicationService) { }

    @MessagePattern({ cmd: 'create_job_application' })
    create(createDto: CreateJobApplicationDto) {
        return this.jobApplicationService.create(createDto);
    }

    @MessagePattern({ cmd: 'get_job_applications' })
    findAll(filters?: { jobPostingId?: string; pharmacistId?: string; pharmacyId?: string; status?: string }) {
        return this.jobApplicationService.findAll(filters);
    }

    @MessagePattern({ cmd: 'get_job_application_stats' })
    getStats(filters: { pharmacistId?: string; pharmacyId?: string }) {
        return this.jobApplicationService.getStats(filters.pharmacistId, filters.pharmacyId);
    }

    @MessagePattern({ cmd: 'get_job_application' })
    findOne(id: string) {
        return this.jobApplicationService.findOne(id);
    }

    @MessagePattern({ cmd: 'update_job_application' })
    update(payload: { id: string; data: UpdateJobApplicationDto }) {
        return this.jobApplicationService.update(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_job_application' })
    remove(id: string) {
        return this.jobApplicationService.remove(id);
    }
}
