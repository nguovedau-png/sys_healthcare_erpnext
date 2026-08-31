import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { NotificationType } from '@prisma/client-notification-service';
import { PaginationDto } from '@app/common';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @MessagePattern({ cmd: 'createNotification' })
  createNotification(
    @Payload()
    data: {
      userId: string;
      title: string;
      content: string;
      type: NotificationType;
    },
  ) {
    return this.notificationService.createNotification(
      data.userId,
      data.title,
      data.content,
      data.type,
    );
  }

  @MessagePattern({ cmd: 'getUserNotifications' })
  getUserNotifications(@Payload() { userId, query }: { userId: string; query: PaginationDto }) {
    return this.notificationService.getUserNotifications(userId, query);
  }

  @MessagePattern({ cmd: 'markNotificationAsRead' })
  markNotificationAsRead(@Payload() notificationId: number) {
    return this.notificationService.markNotificationAsRead(notificationId);
  }

  @MessagePattern({ cmd: 'deleteNotification' })
  deleteNotification(@Payload() notificationId: number) {
    return this.notificationService.deleteNotification(notificationId);
  }
}
