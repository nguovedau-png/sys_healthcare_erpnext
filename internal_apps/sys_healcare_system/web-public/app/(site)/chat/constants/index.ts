export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  CHAT_MESSAGE: 'chat_message',
  CHAT_TYPING: 'chat_typing',
  CHAT_READ: 'chat_read',
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
  JOIN_CHAT: 'join_chat',
  LEAVE_CHAT: 'leave_chat'
} as const;

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  VOICE: 'voice',
  SYSTEM: 'system'
} as const;

export const CHAT_TYPES = {
  PRIVATE: 'private',
  GROUP: 'group'
} as const;

export const USER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  AWAY: 'away',
  DO_NOT_DISTURB: 'do_not_disturb'
} as const;

export const NOTIFICATION_TYPES = {
  MESSAGE: 'message',
  MENTION: 'mention',
  REACTION: 'reaction'
} as const;

export const REACTION_TYPES = {
  LIKE: '👍',
  LOVE: '❤️',
  HAHA: '😄',
  WOW: '😮',
  SAD: '😢',
  ANGRY: '😠'
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'audio/mpeg',
    'audio/wav'
  ]
} as const;

export const CHAT_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 1000,
  MAX_GROUP_MEMBERS: 100,
  MESSAGE_BATCH_SIZE: 50,
  TYPING_TIMEOUT: 3000, // 3 seconds
  MESSAGE_RETRY_LIMIT: 3,
  RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 1000 // 1 second
} as const;