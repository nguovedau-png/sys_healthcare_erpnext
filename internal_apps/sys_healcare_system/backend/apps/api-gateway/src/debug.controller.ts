
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('debug')
export class DebugController {
    constructor(@Inject('JOBS_SERVICE') private readonly client: ClientProxy) { }

    @Get('ping')
    ping() {
        console.log('DebugController.ping called');
        return { message: 'pong' };
    }

    @Get('postings')
    getPostings() {
        console.log('DebugController.getPostings called');
        return this.client.send({ cmd: 'get_job_postings' }, {});
    }
}
