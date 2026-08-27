import apiService from './api';

export interface Role {
    id: number;
    name: string;
    description?: string;
    permissions?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateRoleData {
    name: string;
    description?: string;
    permissions?: string[];
}

export interface UpdateRoleData {
    name?: string;
    description?: string;
    permissions?: string[];
}

class RoleService {
    async getRoles(): Promise<Role[]> {
        return apiService.get<Role[]>('/roles');
    }

    async getRole(id: number): Promise<Role> {
        return apiService.get<Role>(`/roles/${id}`);
    }

    async createRole(data: CreateRoleData): Promise<Role> {
        return apiService.post<Role>('/roles', data);
    }

    async updateRole(id: number, data: UpdateRoleData): Promise<Role> {
        return apiService.put<Role>(`/roles/${id}`, data);
    }

    async deleteRole(id: number): Promise<void> {
        return apiService.delete(`/roles/${id}`);
    }
}

export const roleService = new RoleService();
export default roleService;
