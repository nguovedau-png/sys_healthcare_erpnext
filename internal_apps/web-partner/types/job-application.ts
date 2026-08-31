// Job Application Types

export interface JobApplication {
    id: string;
    pharmacistId: string;
    pharmacistName: string;
    pharmacistAvatar?: string;
    pharmacyId: string;
    pharmacyName: string;
    position: string; // Vị trí ứng tuyển
    cvUrl: string; // Link CV
    coverLetter?: string; // Thư xin việc
    status: 'pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected';
    appliedDate: string;
    reviewedDate?: string;
    notes?: string; // Ghi chú từ nhà thuốc
}

export interface PharmacistJobStats {
    totalApplications: number; // Tổng CV đã gửi
    pending: number; // Chờ xem xét
    reviewed: number; // Đã xem
    interviewed: number; // Đã phỏng vấn
    accepted: number; // Được nhận
    rejected: number; // Bị từ chối
}

export interface PharmacyJobStats {
    totalApplicants: number; // Tổng ứng viên
    newApplications: number; // CV mới
    reviewing: number; // Đang xem xét
    shortlisted: number; // Danh sách ngắn
    hired: number; // Đã tuyển
}

export interface JobPosting {
    id: string;
    pharmacyId: string;
    pharmacyName: string;
    position: string;
    description: string;
    requirements: string[];
    salary: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract';
    status: 'open' | 'closed';
    postedDate: string;
    applicationCount: number;
}

// Helper functions
export function getApplicationStatusText(status: JobApplication['status']): string {
    const statusMap: Record<JobApplication['status'], string> = {
        'pending': 'Chờ xem xét',
        'reviewed': 'Đã xem',
        'interviewed': 'Đã phỏng vấn',
        'accepted': 'Được nhận',
        'rejected': 'Từ chối'
    };
    return statusMap[status];
}

export function getApplicationStatusColor(status: JobApplication['status']): string {
    const colorMap: Record<JobApplication['status'], string> = {
        'pending': 'bg-orange-100 text-orange-700',
        'reviewed': 'bg-blue-100 text-blue-700',
        'interviewed': 'bg-purple-100 text-purple-700',
        'accepted': 'bg-green-100 text-green-700',
        'rejected': 'bg-red-100 text-red-700'
    };
    return colorMap[status];
}

export function calculateApplicationSuccessRate(stats: PharmacistJobStats): number {
    if (stats.totalApplications === 0) return 0;
    return Math.round((stats.accepted / stats.totalApplications) * 100);
}

export function formatTimeSince(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return `${Math.floor(diffDays / 30)} tháng trước`;
}
