import { Controller, LogLevel } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggerService } from './logger.service';

@Controller()
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) { }

  @MessagePattern({ cmd: 'log.create' })
  log(@Payload() data: { level: any; message: string; category: string }) {
    return this.loggerService.log(data.level, data.message, data.category);
  }

  @MessagePattern({ cmd: 'log.get' })
  getLogs(
    @Payload()
    filter: {
      level?: any;
      category?: string;
      startDate?: Date;
      endDate?: Date;
    },
  ) {
    return this.loggerService.getLogs(filter);
  }
}
