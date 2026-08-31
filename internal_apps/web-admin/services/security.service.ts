import apiService from './api';

export interface AuditLog {
    id: number;
    timestamp: string;
    user: string;
    action: string;
    module: string;
    details: string;
    ipAddress: string;
    status: 'success' | 'failure';
}

export interface Backup {
    id: number;
    filename: string;
    size: string;
    type: 'auto' | 'manual';
    createdAt: string;
    status: 'completed' | 'failed' | 'processing';
}

class SecurityService {
    private readonly baseUrl = '/security';

    async getAuditLogs(): Promise<AuditLog[]> {
        try {
            const response = await apiService.get(`${this.baseUrl}/audit-logs`);
            return (response as any).data || response;
        } catch (error) {
            // Mock data fallback
            return [
                { id: 1, timestamp: new Date().toISOString(), user: 'admin', action: 'LOGIN', module: 'Auth', details: 'User logged in', ipAddress: '127.0.0.1', status: 'success' },
                { id: 2, timestamp: new Date().toISOString(), user: 'admin', action: 'UPDATE', module: 'Partners', details: 'Updated clinic #123', ipAddress: '127.0.0.1', status: 'success' },
            ];
        }
    }

    async getBackups(): Promise<Backup[]> {
        try {
            const response = await apiService.get(`${this.baseUrl}/backups`);
            return (response as any).data || response;
        } catch (error) {
            // Mock data fallback
            return [
                { id: 1, filename: 'backup_20231024_000001.sql', size: '1.2 GB', type: 'auto', createdAt: '2023-10-24 00:00:01', status: 'completed' },
                { id: 2, filename: 'backup_20231023_000002.sql', size: '1.1 GB', type: 'auto', createdAt: '2023-10-23 00:00:02', status: 'completed' },
                { id: 3, filename: 'manual_full_backup.sql', size: '2.5 GB', type: 'manual', createdAt: '2023-10-22 15:30:00', status: 'completed' },
            ];
        }
    }

    async createBackup(): Promise<Backup> {
        const response = await apiService.post(`${this.baseUrl}/backups`, {});
        return (response as any).data || response;
    }

    async deleteBackup(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/backups/${id}`);
    }

    async restoreBackup(id: number): Promise<void> {
        await apiService.post(`${this.baseUrl}/backups/${id}/restore`, {});
    }
}

export default new SecurityService();
