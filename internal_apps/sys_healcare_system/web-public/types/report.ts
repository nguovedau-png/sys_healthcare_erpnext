// Reports & Analytics Types

export interface RevenueStats {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    growth: number; // Percent growth vs last month
}

export interface SalesData {
    date: string;
    revenue: number;
    orders: number;
}

export interface TopProduct {
    id: string;
    name: string;
    quantitySold: number;
    revenue: number;
    trend: 'up' | 'down' | 'stable';
}

export interface CustomerStats {
    totalCustomers: number;
    newCustomers: number;
    returningRate: number; // Tỷ lệ quay lại
}

export const MOCK_REVENUE_DATA: SalesData[] = [
    { date: '01/12', revenue: 15000000, orders: 45 },
    { date: '02/12', revenue: 18000000, orders: 52 },
    { date: '03/12', revenue: 12000000, orders: 38 },
    { date: '04/12', revenue: 21000000, orders: 60 },
    { date: '05/12', revenue: 19000000, orders: 55 },
    { date: '06/12', revenue: 25000000, orders: 72 },
    { date: '07/12', revenue: 22000000, orders: 65 }
];

export const MOCK_TOP_PRODUCTS: TopProduct[] = [
    { id: 'p1', name: 'Panadol Extra', quantitySold: 1200, revenue: 180000000, trend: 'up' },
    { id: 'p2', name: 'Vitamin C 500mg', quantitySold: 850, revenue: 51000000, trend: 'stable' },
    { id: 'p3', name: 'Berberin', quantitySold: 500, revenue: 12500000, trend: 'down' },
    { id: 'p4', name: 'Khẩu trang Y tế', quantitySold: 2000, revenue: 70000000, trend: 'up' },
    { id: 'p5', name: 'Glucosamine', quantitySold: 150, revenue: 45000000, trend: 'up' }
];
