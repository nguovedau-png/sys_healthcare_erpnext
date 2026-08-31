import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from './prisma';
import { NotificationType } from '@prisma/client-notification-service';
import {
  PaginationDto,
  getPaginationOptions,
  createPaginatedResponse,
  buildSearchQuery
} from '@app/common';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    @Inject('GATEWAY_SERVICE') private readonly gatewayClient: ClientProxy,
  ) { }

  async createNotification(
    userId: string,
    title: string,
    content: string,
    type: NotificationType,
  ) {
    const result = await this.prisma.notification.create({
      data: {
        userId,
        title,
        content,
        type,
      },
    });

    this.gatewayClient.emit('notificationCreated', result);
    return result;
  }

  async getUserNotifications(userId: string, query: PaginationDto) {
    const { skip, take, orderBy } = getPaginationOptions(query);
    const where = {
      ...buildSearchQuery(query.search, 'title', 'content'),
      userId,
    };

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return createPaginatedResponse(data, total, query);
  }

  async markNotificationAsRead(notificationId: number) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { readAt: new Date() },
    });
  }

  async deleteNotification(notificationId: number) {
    return this.prisma.notification.delete({
      where: { id: notificationId },
    });
  }
}
