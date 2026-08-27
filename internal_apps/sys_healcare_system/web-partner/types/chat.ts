// Chat & Consultation Types

export interface ChatSession {
    id: string;
    participants: {
        id: string;
        name: string;
        role: 'user' | 'pharmacist' | 'doctor';
        avatar?: string;
    }[];
    lastMessage?: Message;
    unreadCount: number;
    status: 'active' | 'closed';
    updatedAt: string;
    patientSnippet?: {
        name: string;
        age?: number;
        gender?: string;
    };
}

export interface Message {
    id: string;
    senderId: string;
    content: string;
    type: 'text' | 'image' | 'prescription' | 'system';
    timestamp: string;
    attachmentUrl?: string;
}

// Mock initial data util
export const MOCK_CHATS: ChatSession[] = [
    {
        id: 'c1',
        participants: [
            { id: 'u1', name: 'Nguyễn Văn A', role: 'user', avatar: '/img/user1.jpg' },
            { id: 'p1', name: 'DS. Trần Thị B', role: 'pharmacist' }
        ],
        lastMessage: { id: 'm1', senderId: 'u1', content: 'Chào dược sĩ, tôi muốn hỏi về thuốc đau dạ dày', type: 'text', timestamp: '2024-12-20T10:30:00' },
        unreadCount: 2,
        status: 'active',
        updatedAt: '2024-12-20T10:30:00',
        patientSnippet: { name: 'Nguyễn Văn A', age: 35, gender: 'Nam' }
    },
    {
        id: 'c2',
        participants: [
            { id: 'u2', name: 'Lê Thị C', role: 'user', avatar: '/img/user2.jpg' },
            { id: 'p1', name: 'DS. Trần Thị B', role: 'pharmacist' }
        ],
        lastMessage: { id: 'm2', senderId: 'p1', content: 'Chị nhớ uống thuốc đúng giờ nhé!', type: 'text', timestamp: '2024-12-19T15:45:00' },
        unreadCount: 0,
        status: 'active',
        updatedAt: '2024-12-19T15:45:00',
        patientSnippet: { name: 'Lê Thị C', age: 28, gender: 'Nữ' }
    }
];

export const MOCK_MESSAGES: Message[] = [
    { id: 'msg1', senderId: 'u1', content: 'Chào dược sĩ, tôi muốn hỏi về thuốc đau dạ dày', type: 'text', timestamp: '2024-12-20T10:30:00' },
    { id: 'msg2', senderId: 'p1', content: 'Chào anh, anh có triệu chứng như thế nào ạ?', type: 'text', timestamp: '2024-12-20T10:31:00' },
    { id: 'msg3', senderId: 'u1', content: 'Tôi hay bị đau âm ỉ lúc đói, và ợ chua nữa.', type: 'text', timestamp: '2024-12-20T10:32:00' }
];
