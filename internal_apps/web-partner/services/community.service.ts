import apiService from './api';

export interface ForumTopic {
    id: number;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    category: string;
    views: number;
    status: string;
    _count?: { replies: number };
    createdAt: string;
}

export interface QAQuestion {
    id: number;
    question: string;
    content?: string;
    askedById: string;
    askedByName: string;
    category: string;
    views: number;
    status: string;
    _count?: { answers: number };
    createdAt: string;
}

export interface SupportGroup {
    id: number;
    name: string;
    description?: string;
    membersCount: number;
    postsCount: number;
    moderatorId: string;
    moderatorName: string;
    status: string;
    createdAt: string;
}

export interface ModerationReport {
    id: number;
    contentId: string;
    contentType: string;
    contentPreview?: string;
    authorId: string;
    authorName: string;
    reportedById: string;
    reportedByName: string;
    reason: string;
    status: string;
    createdAt: string;
}

class CommunityService {
    private readonly baseUrl = '/community';

    // Forum
    async getForumTopics(): Promise<ForumTopic[]> {
        const response = await apiService.get(`${this.baseUrl}/forum/topics`);
        return (response as any).data || response;
    }

    async getForumTopic(id: number): Promise<ForumTopic> {
        const response = await apiService.get(`${this.baseUrl}/forum/topics/${id}`);
        return (response as any).data || response;
    }

    async createForumTopic(data: Partial<ForumTopic>): Promise<ForumTopic> {
        const response = await apiService.post(`${this.baseUrl}/forum/topics`, data);
        return (response as any).data || response;
    }

    async updateForumTopic(id: number, data: Partial<ForumTopic>): Promise<ForumTopic> {
        const response = await apiService.put(`${this.baseUrl}/forum/topics/${id}`, data);
        return (response as any).data || response;
    }

    async deleteForumTopic(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/forum/topics/${id}`);
    }

    // QA
    async getQAQuestions(): Promise<QAQuestion[]> {
        const response = await apiService.get(`${this.baseUrl}/qa/questions`);
        return (response as any).data || response;
    }

    async getQAQuestion(id: number): Promise<QAQuestion> {
        const response = await apiService.get(`${this.baseUrl}/qa/questions/${id}`);
        return (response as any).data || response;
    }

    async createQAQuestion(data: Partial<QAQuestion>): Promise<QAQuestion> {
        const response = await apiService.post(`${this.baseUrl}/qa/questions`, data);
        return (response as any).data || response;
    }

    async updateQAQuestion(id: number, data: Partial<QAQuestion>): Promise<QAQuestion> {
        const response = await apiService.put(`${this.baseUrl}/qa/questions/${id}`, data);
        return (response as any).data || response;
    }

    async deleteQAQuestion(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/qa/questions/${id}`);
    }

    // Support Groups
    async getSupportGroups(): Promise<SupportGroup[]> {
        const response = await apiService.get(`${this.baseUrl}/groups`);
        return (response as any).data || response;
    }

    async getSupportGroup(id: number): Promise<SupportGroup> {
        const response = await apiService.get(`${this.baseUrl}/groups/${id}`);
        return (response as any).data || response;
    }

    async createSupportGroup(data: Partial<SupportGroup>): Promise<SupportGroup> {
        const response = await apiService.post(`${this.baseUrl}/groups`, data);
        return (response as any).data || response;
    }

    async updateSupportGroup(id: number, data: Partial<SupportGroup>): Promise<SupportGroup> {
        const response = await apiService.put(`${this.baseUrl}/groups/${id}`, data);
        return (response as any).data || response;
    }

    async deleteSupportGroup(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/groups/${id}`);
    }

    // Moderation
    async getModerationReports(): Promise<ModerationReport[]> {
        const response = await apiService.get(`${this.baseUrl}/moderation/reports`);
        return (response as any).data || response;
    }

    async updateModerationReport(id: number, data: Partial<ModerationReport>): Promise<ModerationReport> {
        const response = await apiService.put(`${this.baseUrl}/moderation/reports/${id}`, data);
        return (response as any).data || response;
    }

    async deleteModerationReport(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/moderation/reports/${id}`);
    }
}

export default new CommunityService();
