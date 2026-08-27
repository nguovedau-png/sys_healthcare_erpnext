import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CpeService } from './cpe.service';

@Controller('cpe')
export class CpeController {
    constructor(private readonly cpeService: CpeService) { }

    @Get('dashboard/day')
    async getDayDashboard(@Query('date') date?: string) {
        return this.cpeService.getDayDashboard(date);
    }

    @Get('dashboard/week')
    async getWeekDashboard(@Query('year') year?: number) {
        return this.cpeService.getWeekDashboard(year ? Number(year) : undefined);
    }

    @Get('dashboard/month')
    async getMonthDashboard(@Query('year') year?: number) {
        return this.cpeService.getMonthDashboard(year ? Number(year) : undefined);
    }

    @Post('master-data/import')
    async importMasterData(@Body() data: any[]) {
        return this.cpeService.importMasterData(data);
    }

    @Get('master-data')
    async getMasterData() {
        return this.cpeService.getMasterData();
    }
}
