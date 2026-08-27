import apiService from './api';

export interface Staff {
    id: number;
    userId: string;
    email: string;
    name: string;
    phone?: string;
    department?: string;
    position?: string;
    isActive: boolean;
    status?: string;
    avatar?: string;
    role?: {
        name: string;
    };
}

class StaffService {
    private readonly baseUrl = '/users';

    async getStaffList(): Promise<Staff[]> {
        const response = await apiService.get(this.baseUrl);
        // Assuming the response follows { data, meta } structure from createPaginatedResponse
        return (response as any).data || response;
    }

    async getStaff(id: number): Promise<Staff> {
        const response = await apiService.get(`${this.baseUrl}/${id}`);
        return (response as any).data || response;
    }

    async createStaff(data: any): Promise<Staff> {
        // Staff are just users with specific fields
        const response = await apiService.post(this.baseUrl, data);
        return (response as any).data || response;
    }

    async updateStaff(id: number, data: any): Promise<Staff> {
        const response = await apiService.put(`${this.baseUrl}/${id}`, data);
        return (response as any).data || response;
    }

    async deleteStaff(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/${id}`);
    }
}

const staffService = new StaffService();
export default staffService;
