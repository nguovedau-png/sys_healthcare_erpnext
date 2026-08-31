import apiService from './api';

export interface ShopCategory {
    id: number;
    slug: string;
    title: string;
    image?: string | null;
    icon?: string | null;
    products?: ShopProduct[];
}

export interface Pharmacy {
    id: string;
    name: string;
    logo: string;
    coverImage?: string;
    address: string;
    rating: number;
    verified: boolean;
    description?: string;
    location?: string;
}

export interface ShopProduct {
    id: number;
    slug: string;
    title: string;
    image?: string | null;
    price: number;
    originalPrice?: number | null;
    discount?: number | null;
    isNew: boolean;
    isHot: boolean;
    isBestSelling: boolean;
    categoryId?: number | null;
    category?: ShopCategory | null;
    pharmacyName?: string;
    pharmacyVerified?: boolean;
    pharmacyId?: string;
}

const shopService = {
    getCategories: async (): Promise<ShopCategory[]> => {
        const res = await apiService.get('/shop/categories');
        return res as any;
    },

    getProducts: async (params?: {
        categoryId?: number;
        categorySlug?: string;
        isHot?: boolean;
        isBestSelling?: boolean;
        pharmacyId?: string;
    }): Promise<ShopProduct[]> => {
        const res = await apiService.get('/shop/products', { params }) as ShopProduct[];
        
        // Add pharmacy metadata to products if not present
        return res.map((p, idx) => ({
            ...p,
            pharmacyId: p.pharmacyId || String((idx % 4) + 1),
            pharmacyName: p.pharmacyName || ['Pharmacity', 'Long Châu', 'An Khang', 'Phano Pharmacy'][idx % 4],
            pharmacyVerified: p.pharmacyVerified !== undefined ? p.pharmacyVerified : true
        }));
    },

    getHotProducts: async (): Promise<ShopProduct[]> => {
        return shopService.getProducts({ isHot: true });
    },

    getBestSellingProducts: async (): Promise<ShopProduct[]> => {
        return shopService.getProducts({ isBestSelling: true });
    },

    getPharmacies: async (): Promise<Pharmacy[]> => {
        // Mock data for now as we might not have a dedicated endpoint yet
        return [
            { id: '1', name: 'Pharmacity', logo: 'https://www.pharmacity.vn/static/img/logo.png', address: 'Toàn quốc', location: 'Toàn quốc', rating: 4.9, verified: true },
            { id: '2', name: 'Long Châu', logo: 'https://nhathuoclongchau.com.vn/estore-images/logo.png', address: 'Toàn quốc', location: 'Toàn quốc', rating: 4.8, verified: true },
            { id: '3', name: 'An Khang', logo: 'https://www.nhathuocankhang.com/Content/css/images/logo.png', address: 'TP. HCM', location: 'TP. HCM', rating: 4.7, verified: true },
            { id: '4', name: 'Phano Pharmacy', logo: 'https://phanopharmacy.com/images/logo.png', address: 'Đà Nẵng', location: 'Đà Nẵng', rating: 4.6, verified: true },
        ];
    },

    getPharmacyDetail: async (id: string): Promise<Pharmacy | null> => {
        const pharmacies = await shopService.getPharmacies();
        return pharmacies.find(p => p.id === id) || null;
    }
};

export default shopService;
