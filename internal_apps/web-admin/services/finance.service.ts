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
    async getCommissions(params?: any): Promise<{ data: Commission[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/commissions`, { params });
        return response as any;
    }

    async createCommission(data: Partial<Commission>): Promise<Commission> {
        const response = await apiService.post(`${this.baseUrl}/commissions`, data);
        return (response as any).data || response;
    }

    // --- Revenue ---
    async getRevenue(params?: any): Promise<{ data: Revenue[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/revenue`, { params });
        return response as any;
    }

    async createRevenue(data: Partial<Revenue>): Promise<Revenue> {
        const response = await apiService.post(`${this.baseUrl}/revenue`, data);
        return (response as any).data || response;
    }

    // --- Withdrawals ---
    async getWithdrawals(params?: any): Promise<{ data: Withdrawal[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/withdrawals`, { params });
        return response as any;
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

    async getRevenueStats(): Promise<any> {
        try {
            const response = await apiService.get(`${this.baseUrl}/revenue-stats`);
            return (response as any).data || response;
        } catch {
            // Return mock monthly data as fallback
            return {
                monthly: [
                    { name: 'Tháng 1', amount: 4000 },
                    { name: 'Tháng 2', amount: 3000 },
                    { name: 'Tháng 3', amount: 2000 },
                    { name: 'Tháng 4', amount: 2780 },
                    { name: 'Tháng 5', amount: 1890 },
                    { name: 'Tháng 6', amount: 2390 },
                ]
            };
        }
    }
}

export default new FinanceService();
