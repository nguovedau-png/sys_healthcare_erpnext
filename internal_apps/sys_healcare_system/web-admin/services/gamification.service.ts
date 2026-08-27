import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface LeaderboardEntry {
    userId: number;
    userName: string;
    points: number;
    badges: number;
    level: string;
}

export interface Badge {
    id: number;
    name: string;
    description: string;
    icon: string;
    awarded: number;
}

export interface PointRule {
    id: number;
    action: string;
    points: number;
}

export interface GamificationStats {
    totalPoints: number;
    totalPlayers: number;
    totalBadges: number;
    totalRules: number;
}

class GamificationService {
    async getLeaderboard(): Promise<LeaderboardEntry[]> {
        const response = await axios.get(`${API_URL}/gamification/leaderboard`);
        return response.data;
    }

    async getBadges(): Promise<Badge[]> {
        const response = await axios.get(`${API_URL}/gamification/badges`);
        return response.data;
    }

    async getPointRules(): Promise<PointRule[]> {
        const response = await axios.get(`${API_URL}/gamification/rules`);
        return response.data;
    }

    async getStats(): Promise<GamificationStats> {
        const response = await axios.get(`${API_URL}/gamification/stats`);
        return response.data;
    }

    async updatePointRule(id: number, points: number): Promise<PointRule> {
        const response = await axios.patch(`${API_URL}/gamification/rules/${id}`, { points });
        return response.data;
    }

    async createBadge(data: any): Promise<Badge> {
        const response = await axios.post(`${API_URL}/gamification/badges`, data);
        return response.data;
    }
}

export default new GamificationService();
