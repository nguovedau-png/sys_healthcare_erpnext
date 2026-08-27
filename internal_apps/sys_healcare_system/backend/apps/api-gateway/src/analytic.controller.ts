import { Controller, Get, Patch, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('analytics')
export class AnalyticController {
    constructor(
        @Inject('ANALYTIC_SERVICE') private readonly analyticClient: ClientProxy,
    ) { }

    @Get('keywords')
    getKeywords() {
        return firstValueFrom(this.analyticClient.send({ cmd: 'getKeywords' }, {}));
    }

    @Get('hashtags')
    getHashtags() {
        return firstValueFrom(this.analyticClient.send({ cmd: 'getHashtags' }, {}));
    }

    @Patch('keywords/:id/status')
    updateKeywordStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: boolean) {
        return firstValueFrom(this.analyticClient.send({ cmd: 'updateKeywordStatus' }, { id, status }));
    }

    @Patch('hashtags/:id/status')
    updateHashtagStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: boolean) {
        return firstValueFrom(this.analyticClient.send({ cmd: 'updateHashtagStatus' }, { id, status }));
    }
}
