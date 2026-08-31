import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReportService } from './report.service';

@Controller()
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @MessagePattern({ cmd: 'getOverview' })
    getOverview() {
        return this.reportService.getOverview();
    }

    @MessagePattern({ cmd: 'getKPI' })
    getKPI() {
        return this.reportService.getKPI();
    }

    @MessagePattern({ cmd: 'getProgress' })
    getProgress() {
        return this.reportService.getProgress();
    }

    @MessagePattern({ cmd: 'getRevenue' })
    getRevenue() {
        return this.reportService.getRevenue();
    }

    @MessagePattern({ cmd: 'getUsersAnalytics' })
    getUsersAnalytics() {
        return this.reportService.getUsersAnalytics();
    }

    @MessagePattern({ cmd: 'getExportReports' })
    getExportReports() {
        return this.reportService.getExportReports();
    }

    @MessagePattern({ cmd: 'createExportTicket' })
    createExportTicket(data: any) {
        return this.reportService.createExportTicket(data);
    }
}
