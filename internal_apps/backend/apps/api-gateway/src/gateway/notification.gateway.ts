import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class NotificationGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('NotificationGateway');

    @SubscribeMessage('subscribeToNotifications')
    handleMessage(client: Socket, payload: { userId: string }): void {
        client.join(`user_${payload.userId}`);
        this.logger.log(`Client ${client.id} subscribed to user_${payload.userId}`);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    sendNotificationToUser(userId: string, data: any) {
        this.server.to(`user_${userId}`).emit('notification', data);
    }

    broadcastNotification(data: any) {
        this.server.emit('notification', data);
    }
}
