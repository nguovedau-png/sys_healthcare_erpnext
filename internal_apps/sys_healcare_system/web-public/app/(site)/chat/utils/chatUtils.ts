import { Message, Chat, User, ChatAttachment } from '../types';
import { FILE_UPLOAD, CHAT_CONSTANTS } from '../constants';

export const formatMessageTime = (date: Date): string => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffInHours = Math.abs(now.getTime() - messageDate.getTime()) / 36e5;

  if (diffInHours < 24) {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(messageDate);
  } else if (diffInHours < 168) { // 7 days
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(messageDate);
  } else {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(messageDate);
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFileUpload = (file: File): string | null => {
  if (file.size > FILE_UPLOAD.MAX_SIZE) {
    return `Kích thước tệp không được vượt quá ${formatFileSize(FILE_UPLOAD.MAX_SIZE)}`;
  }

  if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.type as any)) {
    return 'Định dạng tệp không được hỗ trợ';
  }

  return null;
};

export const validateMessage = (content: string): string | null => {
  if (!content.trim()) {
    return 'Tin nhắn không được để trống';
  }

  if (content.length > CHAT_CONSTANTS.MAX_MESSAGE_LENGTH) {
    return `Tin nhắn không được vượt quá ${CHAT_CONSTANTS.MAX_MESSAGE_LENGTH} ký tự`;
  }

  return null;
};

export const getUnreadCount = (chat: Chat, userId: string): number => {
  if (!chat.lastMessage) return 0;
  const lastReadMessage = chat.messages.findIndex(m => m.id === chat.lastMessage?.id);
  if (lastReadMessage === -1) return 0;
  return chat.messages.slice(lastReadMessage + 1).filter(m => m.senderId !== userId).length;
};

export const getChatName = (chat: Chat, currentUser: User, participants: User[]): string => {
  if (chat.participants.length === 2) {
    const otherUser = participants.find(u => u.id !== currentUser.id);
    return otherUser?.name || 'Người dùng không xác định';
  }
  return participants.map(u => u.name).join(', ');
};

export const groupMessagesByDate = (messages: Message[]): { [date: string]: Message[] } => {
  return messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString('vi-VN');
    return {
      ...groups,
      [date]: [...(groups[date] || []), message]
    };
  }, {} as { [date: string]: Message[] });
};

export const isImageAttachment = (attachment: ChatAttachment): boolean => {
  return attachment.type === 'image' || attachment.mimeType.startsWith('image/');
};

export const getFileIcon = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) return '🖼️';
  if (mimeType.startsWith('audio/')) return '🎵';
  if (mimeType.startsWith('video/')) return '🎥';
  if (mimeType.includes('pdf')) return '📄';
  if (mimeType.includes('word')) return '📝';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return '📑';
  return '📎';
};