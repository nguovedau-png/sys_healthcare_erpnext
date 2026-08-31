
import { Controller, Get, Post, Put, Delete, Body, Param, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('jobs')
export class JobsController {
    constructor(@Inject('JOBS_SERVICE') private readonly client: ClientProxy) { }

    @Get('postings')
    @Get('postings')
    getJobPostings(
        @Query('pharmacyId') pharmacyId?: string,
        @Query('status') status?: string,
        @Query('type') type?: string,
    ) {
        console.log('API Gateway - JobsController.getJobPostings called with:', { pharmacyId, status, type });
        // Forwarding params as object to match microservice expectation
        return this.client.send({ cmd: 'get_job_postings' }, { pharmacyId, status, type });
    }

    @Get('postings/:id')
    getJobPosting(@Param('id') id: string) {
        console.log('API Gateway - JobsController.getJobPosting called with id:', id);
        return this.client.send({ cmd: 'get_job_posting' }, id);
    }

    @Post('postings')
    createJobPosting(@Body() data: any) {
        return this.client.send({ cmd: 'create_job_posting' }, data);
    }

    @Put('postings/:id')
    updateJobPosting(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_job_posting' }, { id, data });
    }

    @Delete('postings/:id')
    deleteJobPosting(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_job_posting' }, id);
    }

    // --- Job Applications ---
    @Get('applications')
    getJobApplications(
        @Query('jobPostingId') jobPostingId?: string,
        @Query('pharmacistId') pharmacistId?: string,
        @Query('pharmacyId') pharmacyId?: string,
        @Query('status') status?: string,
    ) {
        return this.client.send({ cmd: 'get_job_applications' }, { jobPostingId, pharmacistId, pharmacyId, status });
    }

    @Get('applications/stats')
    getJobApplicationStats(
        @Query('pharmacistId') pharmacistId?: string,
        @Query('pharmacyId') pharmacyId?: string,
    ) {
        return this.client.send({ cmd: 'get_job_application_stats' }, { pharmacistId, pharmacyId });
    }

    @Get('applications/:id')
    getJobApplication(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_job_application' }, id);
    }

    @Post('applications')
    createJobApplication(@Body() data: any) {
        return this.client.send({ cmd: 'create_job_application' }, data);
    }

    @Put('applications/:id')
    updateJobApplication(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_job_application' }, { id, data });
    }

    @Delete('applications/:id')
    deleteJobApplication(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_job_application' }, id);
    }
}
