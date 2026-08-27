import apiService from './api';

export type RecommendationType = 'DOCTOR' | 'DIAGNOSIS' | 'MEDICATION';
export type RecommendationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Recommendation {
    id: number;
    patientName: string;
    symptoms: string;
    recommendedItem: string;
    confidence: number;
    reason: string;
    type: RecommendationType;
    status: RecommendationStatus;
    createdAt: string;
}

export interface AIStats {
    accuracy: number;
    dailySuggestions: number;
    acceptanceRate: number;
    modelVersion: string;
}

export interface ModelPerformance {
    precision: number;
    recall: number;
    f1Score: number;
}

class AIService {
    async getRecommendations(type?: string): Promise<Recommendation[]> {
        return apiService.get<Recommendation[]>('/ai/recommendations', { type });
    }

    async handleFeedback(id: number, status: RecommendationStatus): Promise<Recommendation> {
        return apiService.post<Recommendation>(`/ai/recommendations/${id}/feedback`, { status });
    }

    async getAIStats(): Promise<AIStats> {
        return apiService.get<AIStats>('/ai/stats');
    }

    async getModelPerformance(): Promise<ModelPerformance> {
        return apiService.get<ModelPerformance>('/ai/performance');
    }
}

export default new AIService();
