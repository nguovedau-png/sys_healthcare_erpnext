import apiService from './api';

export interface CpeDashboardDay {
    id: number;
    totalCourses: number;
    totalLessons: number;
    totalActiveUsers: number;
    totalUserLearn: number;
    totalClicks: number;
    createDate: string;
}

export interface CpeDashboardWeek {
    id: number;
    totalCourses: number;
    totalLessons: number;
    totalActiveUsers: number;
    totalUserLearn: number;
    totalClicks: number;
    week: number;
    year: number;
    createDate: string;
}

export interface CpeDashboardMonth {
    id: number;
    totalCourses: number;
    totalLessons: number;
    totalActiveUsers: number;
    totalUserLearn: number;
    totalClicks: number;
    month: number;
    year: number;
    createDate: string;
}

class CpeService {
    async getDayDashboard(date?: string): Promise<CpeDashboardDay[]> {
        return apiService.get<CpeDashboardDay[]>('/education/cpe/dashboard/day', { params: { date } });
    }

    async getWeekDashboard(year?: number): Promise<CpeDashboardWeek[]> {
        return apiService.get<CpeDashboardWeek[]>('/education/cpe/dashboard/week', { params: { year } });
    }

    async getMonthDashboard(year?: number): Promise<CpeDashboardMonth[]> {
        return apiService.get<CpeDashboardMonth[]>('/education/cpe/dashboard/month', { params: { year } });
    }
}

export const cpeService = new CpeService();
export default cpeService;
