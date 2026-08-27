import { io, Socket } from 'socket.io-client';

class SocketService {
    private socket: Socket | null = null;
    private baseUrl = (() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        try {
            return new URL(apiUrl).origin;
        } catch (e) {
            return 'http://localhost:3000';
        }
    })();

    connect() {
        if (!this.socket) {
            this.socket = io(`${this.baseUrl}/chat`, {
                transports: ['websocket'],
                autoConnect: true,
            });

            this.socket.on('connect', () => {
                console.log('Connected to Chat Socket:', this.socket?.id);
            });

            this.socket.on('disconnect', () => {
                console.log('Disconnected from Chat Socket');
            });
        }
        return this.socket;
    }

    joinChat(chatId: string, userId: string) {
        if (this.socket) {
            this.socket.emit('joinChat', { chatId, userId });
        }
    }

    sendMessage(chatId: string, senderId: string, text: string) {
        if (this.socket) {
            this.socket.emit('sendMessage', { 
                chatId, 
                senderId, 
                text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }
    }

    onReceiveMessage(callback: (message: any) => void) {
        if (this.socket) {
            // Remove previous listener to avoid duplicates if re-rendered
            this.socket.off('receiveMessage');
            this.socket.on('receiveMessage', callback);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();
export default socketService;
