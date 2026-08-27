import axios from 'axios';

const FRAPPE_URL = process.env.NEXT_PUBLIC_FRAPPE_URL || 'http://localhost:8000';

export interface SearchKeyword {
    id: number;
    keyword: string;
    keywordVN: string;
    times: number;
    status: boolean;
}

export interface SearchHashtag {
    id: number;
    hashtag: string;
    hashtagVN: string;
    times: number;
    status: boolean;
}

class AnalyticService {
    async getKeywords(): Promise<SearchKeyword[]> {
        try {
            const response = await axios.get(`${FRAPPE_URL}/api/method/lmpharma.api.analytics.get_keywords`);
            return response.data?.message || [];
        } catch {
            return [];
        }
    }

    async getHashtags(): Promise<SearchHashtag[]> {
        try {
            const response = await axios.get(`${FRAPPE_URL}/api/method/lmpharma.api.analytics.get_hashtags`);
            return response.data?.message || [];
        } catch {
            return [];
        }
    }

    async updateKeywordStatus(id: number, status: boolean): Promise<SearchKeyword> {
        const response = await axios.patch(`${FRAPPE_URL}/api/method/lmpharma.api.analytics.update_keyword_status`, { id, status });
        return response.data?.message;
    }

    async updateHashtagStatus(id: number, status: boolean): Promise<SearchHashtag> {
        const response = await axios.patch(`${FRAPPE_URL}/api/method/lmpharma.api.analytics.update_hashtag_status`, { id, status });
        return response.data?.message;
    }

    async getDashboardStats(): Promise<any> {
        // Return mock stats - replace with real Frappe API when available
        return {
            totalUsers: 1240,
            activeUsers: 456,
            completionRate: 75,
            totalRevenue: 150000000
        };
    }
}

export default new AnalyticService();
