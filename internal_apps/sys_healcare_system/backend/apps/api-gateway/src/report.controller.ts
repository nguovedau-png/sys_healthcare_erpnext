import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('reports')
export class ReportController {
    constructor(
        @Inject('REPORT_SERVICE') private readonly reportClient: ClientProxy,
    ) { }

    @Get('overview')
    getOverview() {
        return firstValueFrom(this.reportClient.send({ cmd: 'getOverview' }, {}));
    }

    @Get('kpi')
    getKPI() {
        return firstValueFrom(this.reportClient.send({ cmd: 'getKPI' }, {}));
    }

    @Get('progress')
    getProgress() {
        return firstValueFrom(this.reportClient.send({ cmd: 'getProgress' }, {}));
    }

    @Get('revenue')
    getRevenue() {
        return firstValueFrom(this.reportClient.send({ cmd: 'getRevenue' }, {}));
    }

    @Get('users')
    getUsersAnalytics() {
        return firstValueFrom(this.reportClient.send({ cmd: 'getUsersAnalytics' }, {}));
    }

    @Get('export')
    getExportReports() {
        return firstValueFrom(this.reportClient.send({ cmd: 'getExportReports' }, {}));
    }

    @Post('export')
    createExportTicket(@Body() data: any) {
        return firstValueFrom(this.reportClient.send({ cmd: 'createExportTicket' }, data));
    }
}
