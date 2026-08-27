import axios from 'axios';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const chatService = {
  getChats: async (): Promise<Chat[]> => {
    try {
      const response = await axios.get(`${API_URL}/chats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  },

  getChat: async (chatId: string): Promise<Chat> => {
    try {
      const response = await axios.get(`${API_URL}/chats/${chatId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching chat ${chatId}:`, error);
      throw error;
    }
  },

  createChat: async (participants: string[]): Promise<Chat> => {
    try {
      const response = await axios.post(`${API_URL}/chats`, { participants });
      return response.data;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  },

  sendMessage: async (chatId: string, content: string): Promise<Message> => {
    try {
      const response = await axios.post(`${API_URL}/chats/${chatId}/messages`, {
        content,
        senderId: 'user1' // Thay thế bằng ID người dùng thực tế
      });
      return response.data;
    } catch (error) {
      console.error(`Error sending message to chat ${chatId}:`, error);
      throw error;
    }
  },

  markAsRead: async (chatId: string): Promise<void> => {
    try {
      await axios.post(`${API_URL}/chats/${chatId}/read`);
    } catch (error) {
      console.error(`Error marking chat ${chatId} as read:`, error);
      throw error;
    }
  }
};