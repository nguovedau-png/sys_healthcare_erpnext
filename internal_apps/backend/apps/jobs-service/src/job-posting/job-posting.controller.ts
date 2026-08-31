import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JobPostingService } from './job-posting.service';
import { CreateJobPostingDto, UpdateJobPostingDto } from './dto/job-posting.dto';

@Controller()
export class JobPostingController {
    private readonly logger = new Logger(JobPostingController.name);

    constructor(private readonly jobPostingService: JobPostingService) { }

    @MessagePattern({ cmd: 'create_job_posting' })
    create(createDto: CreateJobPostingDto) {
        return this.jobPostingService.create(createDto);
    }

    @MessagePattern({ cmd: 'get_job_postings' })
    findAll(filters?: { pharmacyId?: string; status?: string; type?: string }) {
        this.logger.debug('Listing job postings', {
            hasPharmacyFilter: Boolean(filters?.pharmacyId),
            status: filters?.status,
            type: filters?.type,
        });
        return this.jobPostingService.findAll(filters);
    }

    @MessagePattern({ cmd: 'get_job_posting' })
    findOne(id: string) {
        return this.jobPostingService.findOne(id);
    }

    @MessagePattern({ cmd: 'update_job_posting' })
    update(payload: { id: string; data: UpdateJobPostingDto }) {
        return this.jobPostingService.update(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_job_posting' })
    remove(id: string) {
        return this.jobPostingService.remove(id);
    }
}
