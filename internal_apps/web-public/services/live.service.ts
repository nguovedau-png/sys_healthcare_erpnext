import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Livestream {
    id: number;
    title: string;
    description: string;
    streamKey: string;
    serverUrl: string;
    isStreaming: boolean;
}

export interface LiveChatMessage {
    id: number;
    userName: string;
    content: string;
}

class LiveService {
    async getLiveConfig(): Promise<Livestream> {
        const response = await axios.get(`${API_URL}/live/config`);
        return response.data;
    }

    async updateLiveConfig(id: number, data: Partial<Livestream>): Promise<Livestream> {
        const response = await axios.patch(`${API_URL}/live/config/${id}`, data);
        return response.data;
    }

    async getLiveMessages(livestreamId: number): Promise<LiveChatMessage[]> {
        const response = await axios.get(`${API_URL}/live/${livestreamId}/messages`);
        return response.data;
    }

    async sendLiveMessage(livestreamId: number, data: any): Promise<LiveChatMessage> {
        const response = await axios.post(`${API_URL}/live/${livestreamId}/messages`, data);
        return response.data;
    }
}

export default new LiveService();
