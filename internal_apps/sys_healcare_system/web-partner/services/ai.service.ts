import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
        const response = await axios.get(`${API_URL}/ai/recommendations`, { params: { type } });
        return response.data;
    }

    async handleFeedback(id: number, status: RecommendationStatus): Promise<Recommendation> {
        const response = await axios.post(`${API_URL}/ai/recommendations/${id}/feedback`, { status });
        return response.data;
    }

    async getAIStats(): Promise<AIStats> {
        const response = await axios.get(`${API_URL}/ai/stats`);
        return response.data;
    }

    async getModelPerformance(): Promise<ModelPerformance> {
        const response = await axios.get(`${API_URL}/ai/performance`);
        return response.data;
    }
}

export default new AIService();
