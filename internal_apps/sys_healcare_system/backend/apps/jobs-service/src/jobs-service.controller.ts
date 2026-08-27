import { Controller, Get } from '@nestjs/common';
import { JobsServiceService } from './jobs-service.service';

@Controller()
export class JobsServiceController {
  constructor(private readonly jobsServiceService: JobsServiceService) {}

  @Get()
  getHello(): string {
    return this.jobsServiceService.getHello();
  }
}
