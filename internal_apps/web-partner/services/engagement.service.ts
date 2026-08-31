import apiService from './api';

export type CommentStatus = 'PENDING' | 'APPROVED' | 'SPAM' | 'DELETED';

export interface Comment {
    id: number;
    userName: string;
    content: string;
    postTitle: string;
    status: CommentStatus;
    createdAt: string;
}

export interface CommentStats {
    pending: number;
    spam: number;
    total: number;
}

export interface EngagementActivities {
    liked: number;
    following: number;
    videosWatched: number;
    comments: number;
}

class EngagementService {
    private readonly baseUrl = '/engagement';

    async getComments(): Promise<Comment[]> {
        return apiService.get(`${this.baseUrl}/comments`);
    }

    async updateCommentStatus(id: number, status: CommentStatus): Promise<Comment> {
        return apiService.patch(`${this.baseUrl}/comments/${id}/status`, { status });
    }

    async getCommentStats(): Promise<CommentStats> {
        return apiService.get(`${this.baseUrl}/comments/stats`);
    }

    async getActivities(): Promise<EngagementActivities> {
        // Fallback for now if backend doesn't have it yet
        try {
            return await apiService.get(`${this.baseUrl}/activities`);
        } catch (e) {
            return {
                liked: 124,
                following: 15,
                videosWatched: 48,
                comments: 32
            };
        }
    }
}

const engagementService = new EngagementService();
export default engagementService;
