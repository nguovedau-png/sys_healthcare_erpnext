import apiService from './api';

export interface Setting {
    id: number;
    key: string;
    value: string;
    description?: string;
    category?: string;
    isPublic: boolean;
    createdAt?: string;
    updatedAt?: string;
}

class SettingService {
    private readonly baseUrl = '/settings';

    async getSettings(): Promise<Setting[]> {
        return apiService.get(this.baseUrl);
    }

    async getSetting(id: number): Promise<Setting> {
        return apiService.get(`${this.baseUrl}/${id}`);
    }

    async createSetting(data: Partial<Setting>): Promise<Setting> {
        return apiService.post(this.baseUrl, data);
    }

    async updateSetting(id: number, data: Partial<Setting>): Promise<Setting> {
        return apiService.put(`${this.baseUrl}/${id}`, data);
    }

    async deleteSetting(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/${id}`);
    }
}

export default new SettingService();
