export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
}

export interface ChatParticipant {
  userId: string;
  joinedAt: Date;
  lastRead?: Date;
}

export interface ChatNotification {
  id: string;
  chatId: string;
  userId: string;
  type: 'message' | 'mention' | 'reaction';
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface ChatReaction {
  messageId: string;
  userId: string;
  type: string;
  createdAt: Date;
}

export interface ChatAttachment {
  id: string;
  messageId: string;
  type: 'image' | 'file' | 'voice';
  url: string;
  name: string;
  size: number;
  mimeType: string;
  createdAt: Date;
}