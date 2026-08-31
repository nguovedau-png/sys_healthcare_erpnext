import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('logs')
export class LoggerController {
    constructor(
        @Inject('LOGGER_SERVICE') private readonly loggerClient: ClientProxy,
    ) { }

    @Get()
    getLogs(@Query() filter: any): Observable<any> {
        return this.loggerClient.send({ cmd: 'log.get' }, filter || {});
    }
}
