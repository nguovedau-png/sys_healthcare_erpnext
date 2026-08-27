// Promotion Management Types

export interface Promotion {
    id?: number;
    code: string; // Mã khuyến mãi
    name: string; // Tên chương trình
    createDate: string; // Ngày tạo
    endDate?: string; // Ngày kết thúc
    systemSource: string; // Nguồn hệ thống (web, mobile, admin)
    link: string; // Link khuyến mãi
    type: string; // Loại (discount, voucher, gift, etc.)
    key: string; // Key/Token
    isSystem: boolean; // Tạo bởi hệ thống
    updateDate: string; // Ngày cập nhật
    description?: string; // Mô tả
    imageLink?: string; // Link ảnh
    videoLink?: string; // Link video
    status: string; // Trạng thái (01=active, 02=inactive, etc.)
    userIdCreate?: string; // ID người tạo
    userNameCreate?: string; // Tên người tạo
    userIdUpdate?: string; // ID người cập nhật
    userNameUpdate?: string; // Tên người cập nhật
    dynamicLink?: string; // Dynamic link
    bannerLandingPage?: string; // Banner landing page
}

export type PromotionType =
    | 'discount' // Giảm giá
    | 'voucher' // Voucher
    | 'gift' // Quà tặng
    | 'cashback' // Hoàn tiền
    | 'combo' // Combo
    | 'flash_sale'; // Flash sale

export type SystemSource =
    | 'web'
    | 'mobile_ios'
    | 'mobile_android'
    | 'admin'
    | 'api';

export interface PromotionStats {
    totalPromotions: number;
    activePromotions: number;
    inactivePromotions: number;
    systemPromotions: number;
    userPromotions: number;
}

// Helper functions
export function getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
        '01': 'Đang hoạt động',
        '02': 'Tạm dừng',
        '03': 'Đã kết thúc',
        '04': 'Chờ duyệt'
    };
    return statusMap[status] || 'Không xác định';
}

export function getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
        '01': 'bg-green-100 text-green-700',
        '02': 'bg-orange-100 text-orange-700',
        '03': 'bg-gray-100 text-gray-700',
        '04': 'bg-blue-100 text-blue-700'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-700';
}

export function getTypeText(type: string): string {
    const typeMap: Record<string, string> = {
        'discount': 'Giảm giá',
        'voucher': 'Voucher',
        'gift': 'Quà tặng',
        'cashback': 'Hoàn tiền',
        'combo': 'Combo',
        'flash_sale': 'Flash Sale'
    };
    return typeMap[type] || type;
}

export function getSystemSourceText(source: string): string {
    const sourceMap: Record<string, string> = {
        'web': 'Website',
        'mobile_ios': 'iOS App',
        'mobile_android': 'Android App',
        'admin': 'Admin Panel',
        'api': 'API'
    };
    return sourceMap[source] || source;
}
