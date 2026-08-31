import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
        const response = await axios.get(`${API_URL}/analytics/keywords`);
        return response.data;
    }

    async getHashtags(): Promise<SearchHashtag[]> {
        const response = await axios.get(`${API_URL}/analytics/hashtags`);
        return response.data;
    }

    async updateKeywordStatus(id: number, status: boolean): Promise<SearchKeyword> {
        const response = await axios.patch(`${API_URL}/analytics/keywords/${id}/status`, { status });
        return response.data;
    }

    async updateHashtagStatus(id: number, status: boolean): Promise<SearchHashtag> {
        const response = await axios.patch(`${API_URL}/analytics/hashtags/${id}/status`, { status });
        return response.data;
    }
}

export default new AnalyticService();
