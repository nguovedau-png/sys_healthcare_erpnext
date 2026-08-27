// Pharmacy and Pharmacist Data Types

export interface PharmacyData {
    // Basic Information
    id: string;
    drugName: string; // Tên nhà thuốc
    address: string; // Địa chỉ đầy đủ
    status: 'active' | 'inactive' | 'pending' | 'suspended'; // Trạng thái
    createDate: string; // Ngày tạo

    // Contact Information
    phoneNumber: string; // Số điện thoại
    installer: string; // Người cài đặt/quản lý
    outletOwner: string; // Chủ cửa hàng (chỉ dành cho nhà thuốc)

    // Location Details
    provinceCode: string; // Mã tỉnh/thành
    districtCode: string; // Mã quận/huyện
    wardCode: string; // Mã phường/xã
    streetName: string; // Tên đường

    // System Information
    os: string; // Hệ điều hành
    token: string; // Token xác thực
    scName: string; // SC Name

    // Professional Information
    gppNumber: string; // Số chứng chỉ GPP (Good Pharmacy Practice)
    gppImage: string; // Hình ảnh chứng chỉ GPP

    // Gamification & Ranking
    pointsCMEOnline: number; // Điểm CME Online
    memberRank: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'; // Hạng thành viên

    // Marketing
    dynamicLink: string; // Link động
    bannerLandingPage: string; // Banner trang landing

    // Additional Fields (from existing system)
    avatar?: string;
    description?: string;
    email?: string;
    website?: string;
    openingHours?: string;
    rating?: number;
    reviewCount?: number;
    verified?: boolean;
    facilities?: string[];
    services?: string[];
    statistic?: {
        like: number;
        view: number;
        share: number;
    };
}

export interface PharmacistData {
    // Basic Information
    id: string;
    fullName: string; // Họ và tên
    address: string; // Địa chỉ
    status: 'active' | 'inactive' | 'pending' | 'suspended'; // Trạng thái
    createDate: string; // Ngày tạo

    // Contact Information
    phoneNumber: string; // Số điện thoại
    installer: string; // Người cài đặt/quản lý

    // Location Details
    provinceCode: string; // Mã tỉnh/thành
    districtCode: string; // Mã quận/huyện
    wardCode: string; // Mã phường/xã
    streetName: string; // Tên đường

    // System Information
    os: string; // Hệ điều hành
    token: string; // Token xác thực
    scName: string; // SC Name

    // Professional Information
    specialistly: string; // Chuyên môn
    career: string; // Nghề nghiệp/Vị trí

    // Gamification & Ranking
    pointsCMEOnline: number; // Điểm CME Online
    memberRank: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'; // Hạng thành viên

    // Marketing
    dynamicLink: string; // Link động
    bannerLandingPage: string; // Banner trang landing

    // Additional Fields (from existing system)
    avatar?: string;
    bio?: string;
    email?: string;
    licenseNumber?: string;
    experience?: number;
    rating?: number;
    reviewCount?: number;
    verified?: boolean;
    workplace?: PharmacyData[]; // Nơi làm việc
    certifications?: string[];
    statistic?: {
        like: number;
        view: number;
        consultations: number;
    };
}

// API Request/Response Types
export interface CreatePharmacyRequest {
    drugName: string;
    address: string;
    phoneNumber: string;
    outletOwner: string;
    provinceCode: string;
    districtCode: string;
    wardCode: string;
    streetName: string;
    gppNumber: string;
    gppImage: string;
    installer: string;
    os: string;
}

export interface UpdatePharmacyRequest extends Partial<CreatePharmacyRequest> {
    id: string;
    status?: PharmacyData['status'];
    pointsCMEOnline?: number;
    memberRank?: PharmacyData['memberRank'];
    dynamicLink?: string;
    bannerLandingPage?: string;
}

export interface CreatePharmacistRequest {
    fullName: string;
    address: string;
    phoneNumber: string;
    provinceCode: string;
    districtCode: string;
    wardCode: string;
    streetName: string;
    specialistly: string;
    career: string;
    installer: string;
    os: string;
}

export interface UpdatePharmacistRequest extends Partial<CreatePharmacistRequest> {
    id: string;
    status?: PharmacistData['status'];
    pointsCMEOnline?: number;
    memberRank?: PharmacistData['memberRank'];
    dynamicLink?: string;
    bannerLandingPage?: string;
}

// Filter Types
export interface PharmacyFilter {
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    status?: PharmacyData['status'];
    memberRank?: PharmacyData['memberRank'];
    hasGPP?: boolean;
    minPoints?: number;
    maxPoints?: number;
}

export interface PharmacistFilter {
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    status?: PharmacistData['status'];
    memberRank?: PharmacistData['memberRank'];
    specialistly?: string;
    career?: string;
    minPoints?: number;
    maxPoints?: number;
}

// Utility Types
export type MemberRankInfo = {
    rank: PharmacyData['memberRank'];
    minPoints: number;
    maxPoints: number;
    benefits: string[];
    color: string;
    icon: string;
};

export const MEMBER_RANKS: Record<PharmacyData['memberRank'], MemberRankInfo> = {
    bronze: {
        rank: 'bronze',
        minPoints: 0,
        maxPoints: 999,
        benefits: ['Hỗ trợ cơ bản', 'Tài liệu CME'],
        color: '#CD7F32',
        icon: '🥉'
    },
    silver: {
        rank: 'silver',
        minPoints: 1000,
        maxPoints: 4999,
        benefits: ['Hỗ trợ ưu tiên', 'Khóa học miễn phí', 'Giảm 5% phí giao dịch'],
        color: '#C0C0C0',
        icon: '🥈'
    },
    gold: {
        rank: 'gold',
        minPoints: 5000,
        maxPoints: 14999,
        benefits: ['Hỗ trợ VIP', 'Tất cả khóa học', 'Giảm 10% phí', 'Badge vàng'],
        color: '#FFD700',
        icon: '🥇'
    },
    platinum: {
        rank: 'platinum',
        minPoints: 15000,
        maxPoints: 49999,
        benefits: ['Hỗ trợ 24/7', 'Khóa học cao cấp', 'Giảm 15% phí', 'Ưu tiên hiển thị'],
        color: '#E5E4E2',
        icon: '💎'
    },
    diamond: {
        rank: 'diamond',
        minPoints: 50000,
        maxPoints: Infinity,
        benefits: ['Hỗ trợ dedicated', 'Tất cả tính năng', 'Miễn phí giao dịch', 'Top hiển thị', 'Tư vấn riêng'],
        color: '#B9F2FF',
        icon: '💠'
    }
};

// Helper Functions
export function getMemberRankByPoints(points: number): PharmacyData['memberRank'] {
    if (points >= 50000) return 'diamond';
    if (points >= 15000) return 'platinum';
    if (points >= 5000) return 'gold';
    if (points >= 1000) return 'silver';
    return 'bronze';
}

export function formatPharmacyAddress(pharmacy: PharmacyData): string {
    return `${pharmacy.streetName}, ${pharmacy.wardCode}, ${pharmacy.districtCode}, ${pharmacy.provinceCode}`;
}

export function isPharmacyActive(pharmacy: PharmacyData): boolean {
    return pharmacy.status === 'active';
}

export function hasValidGPP(pharmacy: PharmacyData): boolean {
    return !!pharmacy.gppNumber && !!pharmacy.gppImage;
}
