import apiService from './api';

export interface LeaderboardEntry {
    userId: number;
    userName: string;
    points: number;
    badges: number;
    level: string;
    avatar?: string;
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

export interface Challenge {
    id: number;
    title: string;
    description: string;
    type: string;
    targetValue: number;
    targetUnit: string;
    rewardText: string;
    rewardType: string;
    durationDays: number;
    timeRemaining?: string;
    image?: string;
    color: string;
    totalJoined: number;
    isActive: boolean;
}

export interface UserChallenge {
    id: number;
    userId: number;
    userName: string;
    challengeId: number;
    progress: number;
    joined: boolean;
    completed: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class GamificationService {
    async getLeaderboard(): Promise<LeaderboardEntry[]> {
        const response = await apiService.get('/gamification/leaderboard');
        return (response as any) || [];
    }

    async getBadges(): Promise<Badge[]> {
        const response = await apiService.get('/gamification/badges');
        return (response as any) || [];
    }

    async getPointRules(): Promise<PointRule[]> {
        const response = await apiService.get('/gamification/rules');
        return (response as any) || [];
    }

    async getStats(): Promise<GamificationStats> {
        return apiService.get('/gamification/stats');
    }

    async getChallenges(): Promise<Challenge[]> {
        const response = await apiService.get('/gamification/challenges');
        return (response as any) || [];
    }

    async getChallenge(id: number): Promise<Challenge> {
        return apiService.get(`/gamification/challenges/${id}`);
    }

    async joinChallenge(challengeId: number, userId: number, userName: string): Promise<UserChallenge> {
        return apiService.post(`/gamification/challenges/${challengeId}/join`, { userId, userName });
    }

    async updateProgress(challengeId: number, userId: number, progress: number): Promise<UserChallenge> {
        return apiService.patch(`/gamification/challenges/${challengeId}/progress`, { userId, progress });
    }

    async updatePointRule(id: number, points: number): Promise<PointRule> {
        return apiService.patch(`/gamification/rules/${id}`, { points });
    }

    async createBadge(data: any): Promise<Badge> {
        return apiService.post('/gamification/badges', data);
    }
}

export default new GamificationService();
