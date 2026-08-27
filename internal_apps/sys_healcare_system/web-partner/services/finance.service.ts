import apiService from './api';

export interface Commission {
    id: number;
    partner: string;
    partnerType: string;
    revenue: number;
    commission: number;
    rate: string;
    month: string;
    status: string;
}

export interface Revenue {
    id: number;
    timestamp: string;
    type: string;
    details: string;
    amount: number;
    fee: number;
    net: number;
    status: string;
}

export interface Withdrawal {
    id: number;
    transactionId: string;
    partnerName: string;
    partnerType: string;
    amount: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    requestDate: string;
    processedDate?: string;
    status: string;
    note?: string;
}

class FinanceService {
    private readonly baseUrl = '/finance';

    // --- Commissions ---
    async getCommissions(): Promise<Commission[]> {
        const response = await apiService.get(`${this.baseUrl}/commissions`);
        return (response as any).data || response;
    }

    async createCommission(data: Partial<Commission>): Promise<Commission> {
        const response = await apiService.post(`${this.baseUrl}/commissions`, data);
        return (response as any).data || response;
    }

    // --- Revenue ---
    async getRevenue(): Promise<Revenue[]> {
        const response = await apiService.get(`${this.baseUrl}/revenue`);
        return (response as any).data || response;
    }

    async createRevenue(data: Partial<Revenue>): Promise<Revenue> {
        const response = await apiService.post(`${this.baseUrl}/revenue`, data);
        return (response as any).data || response;
    }

    // --- Withdrawals ---
    async getWithdrawals(): Promise<Withdrawal[]> {
        const response = await apiService.get(`${this.baseUrl}/withdrawals`);
        return (response as any).data || response;
    }

    async getWithdrawalById(id: number): Promise<Withdrawal> {
        const response = await apiService.get(`${this.baseUrl}/withdrawals/${id}`);
        return (response as any).data || response;
    }

    async createWithdrawal(data: Partial<Withdrawal>): Promise<Withdrawal> {
        const response = await apiService.post(`${this.baseUrl}/withdrawals`, data);
        return (response as any).data || response;
    }

    async updateWithdrawal(id: number, data: Partial<Withdrawal>): Promise<Withdrawal> {
        const response = await apiService.put(`${this.baseUrl}/withdrawals/${id}`, data);
        return (response as any).data || response;
    }

    async deleteWithdrawal(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/withdrawals/${id}`);
    }
}

export default new FinanceService();
