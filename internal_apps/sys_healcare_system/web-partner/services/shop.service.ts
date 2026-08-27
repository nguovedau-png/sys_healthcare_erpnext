import apiService from './api';

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    categoryId: number;
    category?: Category;
    price: number;
    oldPrice?: number;
    stock: number;
    image: string;
    isHot: boolean;
    isBestSelling: boolean;
    description?: string;
}

class ShopService {
    private readonly baseUrl = '/shop';

    async getCategories(): Promise<Category[]> {
        const response = await apiService.get(`${this.baseUrl}/categories`);
        return (response as any).data || response;
    }

    async getProducts(params?: { categoryId?: number, categorySlug?: string, isHot?: boolean, isBestSelling?: boolean }): Promise<Product[]> {
        const response = await apiService.get(`${this.baseUrl}/products`, params);
        return (response as any).data || response;
    }
}

export default new ShopService();
