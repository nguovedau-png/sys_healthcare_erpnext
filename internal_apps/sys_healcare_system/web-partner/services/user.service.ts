import apiService from './api';
import { User } from './auth.service';
export { type User };

export interface CreateUserData {
    userId: string;
    email: string;
    password: string;
    name: string;
    phone?: string;
    address?: string;
    department?: string;
    position?: string;
    roleId?: number;
    isActive?: boolean;
}

export interface UpdateUserData {
    email?: string;
    name?: string;
    phone?: string;
    address?: string;
    department?: string;
    position?: string;
    roleId?: number;
    isActive?: boolean;
}

class UserService {
    async getUsers(): Promise<User[]> {
        return apiService.get<User[]>('/users');
    }

    async getUser(id: number): Promise<User> {
        return apiService.get<User>(`/users/${id}`);
    }

    async createUser(data: CreateUserData): Promise<User> {
        return apiService.post<User>('/users', data);
    }

    async updateUser(id: number, data: UpdateUserData): Promise<User> {
        return apiService.put<User>(`/users/${id}`, data);
    }

    async deleteUser(id: number): Promise<void> {
        return apiService.delete(`/users/${id}`);
    }
}

export const userService = new UserService();
export default userService;
