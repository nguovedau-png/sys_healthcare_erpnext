import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

class EngagementService {
    async getComments(): Promise<Comment[]> {
        const response = await axios.get(`${API_URL}/engagement/comments`);
        return response.data;
    }

    async updateCommentStatus(id: number, status: CommentStatus): Promise<Comment> {
        const response = await axios.patch(`${API_URL}/engagement/comments/${id}/status`, { status });
        return response.data;
    }

    async getCommentStats(): Promise<CommentStats> {
        const response = await axios.get(`${API_URL}/engagement/comments/stats`);
        return response.data;
    }
}

export default new EngagementService();
