import apiService from './api';

export interface PaymentGateway {
    id: number;
    name: string;
    description?: string;
    status: 'active' | 'inactive';
    transactions: number;
    revenue: number;
    fee: string;
    logo?: string;
    config?: {
        merchantId?: string;
        secretKey?: string;
        apiKey?: string;
        endpoint?: string;
    };
}

export interface PaymentConfig {
    defaultMethod: string;
    timeout: number;
    webhookUrl: string;
    returnUrl: string;
}

class PaymentService {
    private readonly baseUrl = '/payments';

    async getGateways(): Promise<PaymentGateway[]> {
        try {
            const response = await apiService.get(`${this.baseUrl}/gateways`);
            return (response as any).data || response;
        } catch (error) {
            // Mock data fallback
            return [
                { id: 1, name: 'VNPay', status: 'active', transactions: 1234, revenue: 2500000000, fee: '2.5%' },
                { id: 2, name: 'Momo', status: 'active', transactions: 890, revenue: 1800000000, fee: '2.0%' },
                { id: 3, name: 'ZaloPay', status: 'inactive', transactions: 456, revenue: 950000000, fee: '2.2%' },
            ];
        }
    }

    async getGatewaysStats() {
        return {
            totalTransactions: 2580,
            totalRevenue: 5250000000,
            avgFee: '2.3%',
            activeCount: 2,
            totalCount: 3
        };
    }

    async updateGateway(id: number, data: Partial<PaymentGateway>): Promise<PaymentGateway> {
        const response = await apiService.put(`${this.baseUrl}/gateways/${id}`, data);
        return (response as any).data || response;
    }

    async getGlobalConfig(): Promise<PaymentConfig> {
        try {
            const response = await apiService.get(`${this.baseUrl}/config`);
            return (response as any).data || response;
        } catch (error) {
            return {
                defaultMethod: 'VNPay',
                timeout: 300,
                webhookUrl: 'https://api.healthcare.com/payments/webhook',
                returnUrl: 'https://healthcare.com/payment/result'
            };
        }
    }

    async updateGlobalConfig(data: PaymentConfig): Promise<PaymentConfig> {
        const response = await apiService.post(`${this.baseUrl}/config`, data);
        return (response as any).data || response;
    }
}

export default new PaymentService();
