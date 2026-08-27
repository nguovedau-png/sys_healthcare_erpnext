import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export type SurveyStatus = 'DRAFT' | 'ACTIVE' | 'CLOSED';
export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TEXT' | 'RATING';

export interface QuestionOption {
    id?: number;
    content: string;
    order?: number;
}

export interface Question {
    id?: number;
    text: string; // Mapped to content in backend
    type: QuestionType;
    options?: string[]; // Kept as string[] for backward compat/simplicity in UI builder, but backend handles objects
    required: boolean;
    order?: number;
}

export interface Survey {
    id: number;
    title: string;
    description?: string;
    status: SurveyStatus;
    createdAt: string;
    updatedAt: string;
    questions?: Question[];
    _count?: {
        responses: number;
    };
}

export interface CreateSurveyDto {
    title: string;
    description?: string;
    status?: SurveyStatus;
    questions?: Omit<Question, 'id'>[];
}

class SurveyService {
    async getSurveys(): Promise<Survey[]> {
        const response = await axios.get(`${API_URL}/surveys`);
        return response.data;
    }

    async getSurveyById(id: number): Promise<Survey> {
        const response = await axios.get(`${API_URL}/surveys/${id}`);
        return response.data;
    }

    async createSurvey(data: CreateSurveyDto): Promise<Survey> {
        const response = await axios.post(`${API_URL}/surveys`, data);
        return response.data;
    }

    async updateSurvey(id: number, data: Partial<CreateSurveyDto>): Promise<Survey> {
        const response = await axios.patch(`${API_URL}/surveys/${id}`, data);
        return response.data;
    }

    async deleteSurvey(id: number): Promise<void> {
        await axios.delete(`${API_URL}/surveys/${id}`);
    }

    async submitResponse(surveyId: number, answers: any, userId?: number): Promise<any> {
        const response = await axios.post(`${API_URL}/surveys/${surveyId}/responses`, { answers, userId });
        return response.data;
    }

    async getResponses(surveyId: number): Promise<any[]> {
        const response = await axios.get(`${API_URL}/surveys/${surveyId}/responses`);
        return response.data;
    }

    async getSurveyAnalytics(id: number): Promise<any> {
        const response = await axios.get(`${API_URL}/surveys/${id}/analytics`);
        return response.data;
    }
}

export default new SurveyService();
