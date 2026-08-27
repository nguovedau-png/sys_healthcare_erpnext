// Inventory Management Types

export interface Product {
    id: string;
    name: string;
    sku: string; // Stock Keeping Unit
    category: string;
    manufacturer: string;
    price: number;
    unit: string;
    description?: string;
    image?: string;
    minThreshold: number; // Mức tồn kho tối thiểu
    totalQuantity: number;
    status: 'active' | 'inactive';
}

export interface Batch {
    id: string;
    productId: string;
    batchNumber: string; // Số lô
    manufactureDate: string; // NSX
    expiryDate: string; // HSD
    quantity: number;
    importPrice: number;
    supplier: string;
}

export interface Transaction {
    id: string;
    type: 'import' | 'export' | 'adjustment';
    productId: string;
    productName: string;
    quantity: number;
    date: string;
    performedBy: string; // User ID
    note?: string;
}

export interface InventoryStats {
    totalProducts: number;
    lowStockCount: number;
    outOfStockCount: number;
    expiredCount: number; // Số lô hết hạn
    totalValue: number;
}

// Helper functions
export function getStockStatus(product: Product): { text: string; color: string; status: 'ok' | 'low' | 'out' } {
    if (product.totalQuantity === 0) {
        return { text: 'Hết hàng', color: 'bg-red-100 text-red-700', status: 'out' };
    }
    if (product.totalQuantity <= product.minThreshold) {
        return { text: 'Sắp hết', color: 'bg-orange-100 text-orange-700', status: 'low' };
    }
    return { text: 'Còn hàng', color: 'bg-green-100 text-green-700', status: 'ok' };
}

export function isExpired(date: string): boolean {
    return new Date(date) < new Date();
}

export function isNearExpiry(date: string, daysThreshold: number = 90): boolean {
    const expiry = new Date(date);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= daysThreshold;
}
