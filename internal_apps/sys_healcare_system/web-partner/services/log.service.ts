import apiService from './api';

export interface Log {
    id: number;
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
    message: string;
    category: string;
    timestamp: string;
}

class LogService {
    async getLogs(filter?: any): Promise<Log[]> {
        return apiService.get('/v1/logs', filter);
    }
}

export default new LogService();
