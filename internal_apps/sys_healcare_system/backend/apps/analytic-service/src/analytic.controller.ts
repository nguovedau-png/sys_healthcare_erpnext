import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnalyticService } from './analytic.service';

@Controller()
export class AnalyticController {
    constructor(private readonly analyticService: AnalyticService) { }

    @MessagePattern({ cmd: 'getKeywords' })
    getKeywords() {
        return this.analyticService.getKeywords();
    }

    @MessagePattern({ cmd: 'getHashtags' })
    getHashtags() {
        return this.analyticService.getHashtags();
    }

    @MessagePattern({ cmd: 'updateKeywordStatus' })
    updateKeywordStatus(payload: { id: number, status: boolean }) {
        return this.analyticService.updateKeywordStatus(payload.id, payload.status);
    }

    @MessagePattern('updateHashtagStatus')
    updateHashtagStatus(@Payload() payload: { id: number; status: boolean }) {
        return this.analyticService.updateHashtagStatus(payload.id, payload.status);
    }

    @MessagePattern('get_dashboard_stats')
    getDashboardStats() {
        return this.analyticService.getDashboardStats();
    }
}
