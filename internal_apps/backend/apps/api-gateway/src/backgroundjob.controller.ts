import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Query,
    Param,
    Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('background-jobs')
export class BackgroundJobController {
    constructor(
        @Inject('BACKGROUNDJOB_SERVICE') private readonly jobClient: ClientProxy,
    ) { }

    @Get()
    async getJobs(
        @Query('type') jobType?: string,
        @Query('status') status?: string,
    ) {
        return firstValueFrom(
            this.jobClient.send(
                { cmd: 'job.getAll' },
                {
                    jobType: jobType?.toUpperCase(),
                    status,
                },
            ),
        );
    }

    @Get('stats')
    async getStats() {
        return firstValueFrom(
            this.jobClient.send({ cmd: 'job.stats' }, {}),
        );
    }

    @Get(':id')
    async getJob(@Param('id') id: string) {
        return firstValueFrom(
            this.jobClient.send({ cmd: 'job.getOne' }, parseInt(id)),
        );
    }

    @Post()
    async createJob(@Body() data: any) {
        return firstValueFrom(
            this.jobClient.send({ cmd: 'job.create' }, {
                jobType: data.jobType.toUpperCase(),
                name: data.name,
                data: data.data,
                scheduledAt: data.scheduledAt,
            }),
        );
    }

    @Delete(':id')
    async deleteJob(@Param('id') id: string) {
        return firstValueFrom(
            this.jobClient.send({ cmd: 'job.delete' }, parseInt(id)),
        );
    }
}
