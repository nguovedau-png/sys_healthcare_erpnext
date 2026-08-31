import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface SystemOverview {
    id: number;
    totalRevenue: number;
    revenueTrend: string;
    totalOrders: number;
    ordersTrend: string;
    totalUsers: number;
    usersTrend: string;
    totalPartners: number;
    partnersTrend: string;
}

export interface EducationKPI {
    id: number;
    totalEnrolled: number;
    expectedEnrolled: number;
    enrollmentRate: number;
    started: number;
    completed: number;
    startedRate: number;
    completedRate: number;
    totalNotifications: number;
    usageFrequency: number;
    avgCourseDuration: string;
}

export interface LearningProgress {
    id: number;
    watched70Lesson: number;
    watched70All: number;
    totalLearners: number;
    preTestTotal: number;
    preTestPassed: number;
    postTestTotal: number;
    postTestPassed: number;
}

export interface RevenueReport {
    id: number;
    month: string;
    revenue: number;
    orders: number;
    avgOrderValue: number;
    growth: number;
}

export interface UserAnalytics {
    id: number;
    totalUsers: number;
    activeUsers: number;
    activityRate: number;
    multipleSessionUsers: number;
}

export interface ExportTicket {
    id: number;
    title: string;
    description: string;
    count: number;
    icon: string;
    color: string;
    status: string;
    fileUrl?: string;
    createdAt: string;
}

class ReportService {
    private getFullUrl(path: string) {
        return `${API_URL}${path}`;
    }

    async getOverview(): Promise<SystemOverview> {
        const response = await axios.get(this.getFullUrl('/reports/overview'));
        return response.data;
    }

    async getKPI(): Promise<EducationKPI> {
        const response = await axios.get(this.getFullUrl('/reports/kpi'));
        return response.data;
    }

    async getProgress(): Promise<LearningProgress> {
        const response = await axios.get(this.getFullUrl('/reports/progress'));
        return response.data;
    }

    async getRevenue(): Promise<RevenueReport[]> {
        const response = await axios.get(this.getFullUrl('/reports/revenue'));
        return response.data;
    }

    async getUsersAnalytics(): Promise<UserAnalytics> {
        const response = await axios.get(this.getFullUrl('/reports/users'));
        return response.data;
    }

    async getExportReports(): Promise<ExportTicket[]> {
        const response = await axios.get(this.getFullUrl('/reports/export'));
        return response.data;
    }

    async triggerExport(data: Partial<ExportTicket>): Promise<ExportTicket> {
        const response = await axios.post(this.getFullUrl('/reports/export'), data);
        return response.data;
    }
}

const reportService = new ReportService();
export default reportService;
