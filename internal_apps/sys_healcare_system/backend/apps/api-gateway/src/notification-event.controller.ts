import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationGateway } from './gateway/notification.gateway';

@Controller()
export class NotificationEventController {
    constructor(private readonly notificationGateway: NotificationGateway) { }

    @EventPattern('notificationCreated')
    handleNotificationCreated(@Payload() data: any) {
        if (data.userId) {
            this.notificationGateway.sendNotificationToUser(data.userId.toString(), data);
        } else {
            this.notificationGateway.broadcastNotification(data);
        }
    }

    @EventPattern('systemAlert')
    handleSystemAlert(@Payload() data: any) {
        this.notificationGateway.broadcastNotification({
            ...data,
            type: 'alert'
        });
    }
}
