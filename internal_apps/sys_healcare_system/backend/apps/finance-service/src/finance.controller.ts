import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FinanceService } from './finance.service';
import { PaginationDto } from '@app/common';

@Controller()
export class FinanceController {
    constructor(private readonly financeService: FinanceService) { }

    // --- Commissions ---
    @MessagePattern({ cmd: 'get_commissions' })
    getCommissions(@Payload() query: PaginationDto) {
        return this.financeService.getCommissions(query);
    }

    @MessagePattern({ cmd: 'create_commission' })
    createCommission(@Payload() data: any) {
        return this.financeService.createCommission(data);
    }

    @MessagePattern({ cmd: 'update_commission' })
    updateCommission(@Payload() payload: { id: number; data: any }) {
        return this.financeService.updateCommission(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_commission' })
    deleteCommission(@Payload() id: number) {
        return this.financeService.deleteCommission(id);
    }

    // --- Revenue ---
    @MessagePattern({ cmd: 'get_revenue' })
    getRevenue(@Payload() query: PaginationDto) {
        return this.financeService.getRevenue(query);
    }

    @MessagePattern({ cmd: 'create_revenue' })
    createRevenue(@Payload() data: any) {
        return this.financeService.createRevenue(data);
    }

    @MessagePattern({ cmd: 'update_revenue' })
    updateRevenue(@Payload() payload: { id: number; data: any }) {
        return this.financeService.updateRevenue(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_revenue' })
    deleteRevenue(@Payload() id: number) {
        return this.financeService.deleteRevenue(id);
    }

    // --- Withdrawals ---
    @MessagePattern({ cmd: 'get_withdrawals' })
    getWithdrawals(@Payload() query: PaginationDto) {
        return this.financeService.getWithdrawals(query);
    }

    @MessagePattern({ cmd: 'get_withdrawal_by_id' })
    getWithdrawalById(@Payload() id: number) {
        return this.financeService.getWithdrawalById(id);
    }

    @MessagePattern({ cmd: 'create_withdrawal' })
    createWithdrawal(@Payload() data: any) {
        return this.financeService.createWithdrawal(data);
    }

    @MessagePattern({ cmd: 'update_withdrawal' })
    updateWithdrawal(@Payload() payload: { id: number; data: any }) {
        return this.financeService.updateWithdrawal(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_withdrawal' })
    deleteWithdrawal(@Payload() id: number) {
        return this.financeService.deleteWithdrawal(id);
    }

    @MessagePattern({ cmd: 'get_revenue_stats' })
    getRevenueStats() {
        return this.financeService.getRevenueStats();
    }
}
