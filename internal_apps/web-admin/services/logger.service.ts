import apiService from './api';

export interface Log {
    id: number;
    level: string;
    message: string;
    category: string;
    timestamp: string;
}

class LoggerService {
    private readonly baseUrl = '/logs';

    async getLogs(params?: any): Promise<{ data: Log[], meta: any }> {
        const response = await apiService.get(this.baseUrl, { params });
        return response as any;
    }
}

export default new LoggerService();
