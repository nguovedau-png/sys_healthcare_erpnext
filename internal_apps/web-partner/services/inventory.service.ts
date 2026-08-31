import apiService from './api';

export interface InventoryItem {
    id: number;
    name: string;
    sku: string;
    category?: string;
    manufacturer?: string;
    price: number;
    stock: number;
    minStock: number;
    expiry?: string;
    status: string;
}

class InventoryService {
    private readonly baseUrl = '/erp/inventory';

    async getInventoryItems(): Promise<InventoryItem[]> {
        const response = await apiService.get(this.baseUrl);
        return (response as any).data || response;
    }

    async getInventoryItem(id: number): Promise<InventoryItem> {
        const response = await apiService.get(`${this.baseUrl}/${id}`);
        return (response as any).data || response;
    }

    async createInventoryItem(data: Partial<InventoryItem>): Promise<InventoryItem> {
        const response = await apiService.post(this.baseUrl, data);
        return (response as any).data || response;
    }

    async updateInventoryItem(id: number, data: Partial<InventoryItem>): Promise<InventoryItem> {
        const response = await apiService.put(`${this.baseUrl}/${id}`, data);
        return (response as any).data || response;
    }

    async deleteInventoryItem(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/${id}`);
    }
}

const inventoryService = new InventoryService();
export default inventoryService;
