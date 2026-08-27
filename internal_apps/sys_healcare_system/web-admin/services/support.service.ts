import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface SupportChat {
    id: number;
    userName: string;
    lastMsg: string;
    unread: number;
    status: string;
}

export interface SupportMessage {
    id: number;
    sender: 'user' | 'admin';
    content: string;
    createdAt: string;
}

class SupportService {
    async getSupportChats(): Promise<SupportChat[]> {
        const response = await axios.get(`${API_URL}/support/chats`);
        return response.data;
    }

    async getChatMessages(chatId: number): Promise<SupportMessage[]> {
        const response = await axios.get(`${API_URL}/support/chats/${chatId}/messages`);
        return response.data;
    }

    async sendSupportMessage(chatId: number, sender: string, content: string): Promise<SupportMessage> {
        const response = await axios.post(`${API_URL}/support/chats/${chatId}/messages`, { sender, content });
        return response.data;
    }
}

export default new SupportService();
