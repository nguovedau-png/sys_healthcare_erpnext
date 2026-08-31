import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    namespace: '/chat',
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');

    afterInit(server: Server) {
        this.logger.log('Chat Gateway Initialized');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected from chat: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected to chat: ${client.id}`);
    }

    @SubscribeMessage('joinChat')
    handleJoinChat(@ConnectedSocket() client: Socket, @MessageBody() payload: { chatId: string, userId: string }): void {
        const room = `chat_${payload.chatId}`;
        client.join(room);
        this.logger.log(`Client ${client.id} (User: ${payload.userId}) joined room: ${room}`);
    }

    @SubscribeMessage('sendMessage')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: { chatId: string, senderId: string, text: string, time: string }): void {
        const room = `chat_${payload.chatId}`;
        this.logger.log(`Message sent in room ${room} from ${payload.senderId}: ${payload.text}`);
        
        // Broadcast to everyone in the room (including sender if desired, or use broadcast.to to exclude sender)
        // Here we send to everyone in the room so the sender's client also receives it and confirms delivery
        this.server.to(room).emit('receiveMessage', {
            id: Math.random().toString(36).substring(7),
            chatId: payload.chatId,
            senderId: payload.senderId,
            text: payload.text,
            time: payload.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    }
}
