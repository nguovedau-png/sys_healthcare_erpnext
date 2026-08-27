import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';

@Module({
    controllers: [JobApplicationController],
    providers: [JobApplicationService],
    exports: [JobApplicationService],
})
export class JobApplicationModule { }
