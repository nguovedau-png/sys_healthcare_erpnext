// Loyalty Program Types

export interface LoyaltyMember {
    id: string;
    userId: string;
    fullName: string;
    phone: string;
    currentTier: 'silver' | 'gold' | 'platinum' | 'diamond';
    totalPoints: number; // Tổng điểm tích lũy trọn đời
    currentPoints: number; // Điểm hiện tại có thể đổi
    joinDate: string;
    lastTransactionDate?: string;
}

export interface Reward {
    id: string;
    name: string;
    description: string;
    pointsRequired: number;
    type: 'voucher' | 'product' | 'service';
    value?: number; // Giá trị giảm giá nếu là voucher
    image?: string;
    status: 'active' | 'inactive';
}

export interface PointHistory {
    id: string;
    memberId: string;
    type: 'earn' | 'redeem' | 'expire';
    points: number; // + hoặc -
    description: string;
    date: string;
    orderId?: string;
}

export const MEMBER_TIERS = {
    silver: { name: 'Thành viên Bạc', color: 'bg-gray-100 text-gray-700', minPoints: 0 },
    gold: { name: 'Thành viên Vàng', color: 'bg-yellow-100 text-yellow-700', minPoints: 1000 },
    platinum: { name: 'Thành viên Bạch Kim', color: 'bg-blue-100 text-blue-700', minPoints: 5000 },
    diamond: { name: 'Thành viên Kim Cương', color: 'bg-purple-100 text-purple-700', minPoints: 10000 }
};

export function getTierInfo(tier: keyof typeof MEMBER_TIERS) {
    return MEMBER_TIERS[tier];
}
