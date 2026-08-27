import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export enum LiveProvider {
    WEBRTC = 'WEBRTC',
    AGORA = 'AGORA',
    ZOOM = 'ZOOM',
    JITSI = 'JITSI',
    OTHER = 'OTHER'
}

export interface Livestream {
    id: number;
    title: string;
    description: string;
    provider: LiveProvider;
    providerConfig?: any;
    streamKey?: string;
    serverUrl?: string;
    isStreaming: boolean;
    startedAt?: string;
    duration?: number;
}

export interface LiveChatMessage {
    id: number;
    userName: string;
    content: string;
    userRole?: string;
}

export interface LiveViewer {
    id: number;
    userId: string;
    userName: string;
    joinedAt: string;
    leftAt?: string;
}

class LiveService {
    async getLiveSessions(): Promise<Livestream[]> {
        const response = await axios.get(`${API_URL}/live/sessions`);
        console.log(response);
        return response.data;
    }

    async getLiveSession(id: number): Promise<Livestream> {
        const response = await axios.get(`${API_URL}/live/sessions/${id}`);
        return response.data;
    }

    async createLiveSession(data: any): Promise<Livestream> {
        const response = await axios.post(`${API_URL}/live/sessions`, data);
        return response.data;
    }

    async updateLiveConfig(id: number, data: Partial<Livestream>): Promise<Livestream> {
        const response = await axios.patch(`${API_URL}/live/sessions/${id}`, data);
        return response.data;
    }

    async deleteLiveSession(id: number): Promise<void> {
        await axios.delete(`${API_URL}/live/sessions/${id}`);
    }

    async getLiveMessages(livestreamId: number): Promise<LiveChatMessage[]> {
        const response = await axios.get(`${API_URL}/live/sessions/${livestreamId}/messages`);
        return response.data;
    }

    async sendLiveMessage(livestreamId: number, data: any): Promise<LiveChatMessage> {
        const response = await axios.post(`${API_URL}/live/sessions/${livestreamId}/messages`, data);
        return response.data;
    }

    async addViewer(livestreamId: number, viewerData: { userId: string, userName: string }): Promise<LiveViewer> {
        const response = await axios.post(`${API_URL}/live/sessions/${livestreamId}/viewers`, viewerData);
        return response.data;
    }

    async removeViewer(livestreamId: number, userId: string): Promise<void> {
        await axios.delete(`${API_URL}/live/sessions/${livestreamId}/viewers/${userId}`);
    }

    async getViewers(livestreamId: number): Promise<LiveViewer[]> {
        const response = await axios.get(`${API_URL}/live/sessions/${livestreamId}/viewers`);
        return response.data;
    }
}

export default new LiveService();
