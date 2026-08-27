import { Module } from '@nestjs/common';
import { JobPostingModule } from './job-posting/job-posting.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, JobPostingModule, JobApplicationModule],
})
export class JobsServiceModule { }
